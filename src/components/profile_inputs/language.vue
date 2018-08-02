<template>
  <div>
    <div class="titleEducation">
      <h2>Укажите языки, которыми владеете</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput">
      <div>
        <v-select
          :items="itemsLanguage"
          :loading="loading"
          v-model="valueProfile.level.lng"
          :rules="typeRules"
          label="Язык"
        ></v-select>
        <div class="sliderLng">
          <v-slider
            v-model="valueProfile.level.value"
            :tick-labels="template"
            :max="4"
            step="1"
            :disabled="isEnterLng"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </div>
      </div>
    </v-form>
    <div class="btnSection">
      <v-btn
        color="primary"
        v-if="!showSaveTable"
        @click="addItemToTable">
        <span>Добавить</span>
      </v-btn>
      <v-btn
        saveToTable
        v-if="showSaveTable"
        color="success"
        style="margin-left: 25px"
        @click="saveToTable(indexEditItem)">
        <span>Сохранить в таблицу</span>
      </v-btn>
    </div>
    <v-data-table
      :items="valueProfile.dataTable"
      hide-actions
      class="elevation-1"
      :headers="header"
      :loading="loading"
    >
      <template slot="items" slot-scope="props">
        <!--<td v-for="(value, i, key) in props.item" :key="key">{{value}}</td>-->
        <td>{{props.item.lng}}</td>
        <td>{{template[props.item.value]}}</td>
        <td class="justify-center align-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'language',
  data () {
    return {
      valid: false,
      isEnterLng: true,
      valueSlider: 0,
      showSaveTable: false,
      itemsLanguage: ['Русский', 'Украинский', 'Английский'],
      template: ['Начальный', 'Средний', 'Продвинутый', 'Владею в совершенстве', 'Родной'],
      header: [
        {
          text: 'Язык',
          align: 'left',
          sortable: false,
          value: 'lng'
        },
        { text: 'Уровень', value: 'level' },
        { text: 'Изменить/удалить', align: 'center', value: 'name', sortable: false }
      ],
      typeRules: [
        v => {
          const valide = !!v
          valide ? this.isEnterLng = false : this.isEnterLng = true
          return !!v || 'Обязательное поле'
        }
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].language
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    }
  },
  methods: {
    saveToTable (i) {
      this.showSaveTable = false
      this.$store.commit('dataStore/saveDataTable', {
        key: 'language',
        index: i,
        value: {
          value: this.valueProfile.level.value,
          lng: this.valueProfile.level.lng
        }
      })
    },
    editItem (item) {
      this.indexEditItem = this.valueProfile.dataTable.indexOf(item)
      this.showSaveTable = true
      for (let key in this.valueProfile.level) {
        this.valueProfile.level[key] = item[key]
      }
    },
    deleteItem (item) {
      this.$store.commit('dataStore/deleteDataTable', {
        key: 'language',
        index: this.valueProfile.dataTable.indexOf(item)
      })
      // this.valueProfile.value = ''
    },
    addItemToTable () {
      if (this.$refs.form.validate()) {
        console.log(this.valueProfile)
        let repeadValue = this.valueProfile.dataTable.findIndex(item => {
          for (let key in this.valueProfile) {
            if (typeof this.valueProfile[key] === 'string' || 'number') {
              return this.valueProfile[key] === item[key]
            }
          }
        })
        console.log(repeadValue)
        if (repeadValue === -1) {
          this.$store.commit('dataStore/addDataToTable',
            {
              key: 'language',
              value: {
                value: this.valueProfile.level.value,
                lng: this.valueProfile.level.lng
              }
            })
        } else {
          this.$store.commit('dataStore/showRepeat', true)
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .titleEducation{
    text-align: left;
  }
  .titleEducation h2{
    font-weight: 400;
  }
  .sliderLng{
    margin-top: 10px;
  }
  .btnSection{
    text-align: right;
    margin-bottom: 20px;
  }
  .btnSection > button{
    margin: 0;
  }
</style>
