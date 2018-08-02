<template>
  <div>
    <div class="titleEducation">
      <h2>Владение автомобилями</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput mainHobby">
      <div v-for="(item, key, i) in valueProfile.data" :key="i">
        <div v-if="typeof item.value === 'string'">
          <v-text-field
            v-model="item.value"
            :loading="loading"
            :label="label[i]"
            :rules="validate"
            required
          ></v-text-field>
        </div>
      </div>
      <div>
        <v-checkbox
          v-model="valueProfile.data.guarantee.value"
          :label="label[label.length - 1]"
          hide-details
        ></v-checkbox>
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
        <td>{{props.item.mark}}</td>
        <td>{{props.item.model}}</td>
        <td>{{props.item.years}}</td>
        <td v-if="props.item.guarantee">Есть</td>
        <td v-else>Нету</td>
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
    name: 'car',
    data () {
      return {
        valid: false,
        showSaveTable: false,
        label: ['Марка', 'Модель', 'Год выпуска', 'На гарантии'],
        header: [
          {
            text: 'Марка',
            align: 'left',
            value: 'lng'
          },
          { text: 'Модель', value: 'level' },
          { text: 'Год Выпуска', value: 'level' },
          { text: 'Гарантия', value: 'level' },
          { text: 'Изменить/удалить', align: 'center', value: 'name', sortable: false }
        ],
        validate: [
          v => !!v || 'Обязательное поле'
        ]
      }
    },
    computed: {
      valueProfile () {
        return this.$store.getters['dataStore/getDataInputProfile'].car
      },
      loading () {
        return this.$store.getters['dataStore/getLoadingInput']
      }
    },
    methods: {
      saveToTable (i) {
        this.showSaveTable = false
        this.$store.commit('dataStore/saveDataTable', {
          key: 'car',
          index: i,
          value: {
            mark: this.valueProfile.data.mark.value,
            model: this.valueProfile.data.model.value,
            years: this.valueProfile.data.years.value,
            guarantee: this.valueProfile.data.guarantee.value
          }
        })
      },
      editItem (item) {
        this.indexEditItem = this.valueProfile.dataTable.indexOf(item)
        this.showSaveTable = true
        for (let key in this.valueProfile.data) {
          this.valueProfile.data[key].value = item[key]
        }
      },
      deleteItem (item) {
        this.$store.commit('dataStore/deleteDataTable', {
          key: 'car',
          index: this.valueProfile.dataTable.indexOf(item)
        })
        // this.valueProfile.value = ''
      },
      addItemToTable () {
        if (this.$refs.form.validate()) {
          this.$store.commit('dataStore/addDataToTable',
            {
              key: 'car',
              value: {
                mark: this.valueProfile.data.mark.value,
                model: this.valueProfile.data.model.value,
                years: this.valueProfile.data.years.value,
                guarantee: this.valueProfile.data.guarantee.value
              }
            })
          // for (let key in this.valueProfile.data) {
          //   this.valueProfile.data[key].value = ''
          // }
          // let repeadValue = this.valueProfile.dataTable.findIndex((item, i) => {
          //   for (let key in this.valueProfile.level) {
          //     if (typeof this.valueProfile.level[key] === 'string') {
          //       return this.valueProfile.level[key] === item[key]
          //     }
          //   }
          // })
          // if (repeadValue === -1) {
          //   this.$store.commit('dataStore/addDataToTable',
          //     {
          //       key: 'car',
          //       value: {
          //         value: this.valueProfile.level.value,
          //         lng: this.valueProfile.level.lng
          //       }
          //     })
        } else {
          // this.$store.commit('dataStore/showRepeat', true)
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
</style>
