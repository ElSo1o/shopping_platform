<template>
  <div>
    <div class="titleEducation">
      <h2>Места и опыт работы</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput">
      <div>
        <v-select
          :items="itemsWork"
          :loading="loading"
          v-model="valueProfile.data.sphere"
          :rules="typeRules"
          label="Cфера"
        ></v-select>
        <v-text-field
          v-model="valueProfile.data.organization"
          :loading="loading"
          :rules="typeRules"
          label="Организация"
          required
        ></v-text-field>
        <v-text-field
          v-model="valueProfile.data.position"
          :loading="loading"
          :rules="typeRules"
          label="Должность"
          required
        ></v-text-field>
        <div class="workPickerSection">
          <div class="workPicker">
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="valueProfile.data.periodWith"
                :loading="loading"
                label="Период с"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="valueProfile.data.periodWith"
                :loading="loading"
                color="primary"
                header-color="green lighten-1"
                ref="picker"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                no-title
                locale="ru-ru"
                first-day-of-week="1"
                scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Выйти</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(valueProfile.data.periodWith)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="switchPicker">
            <v-switch :label="`Сейчас работаю`" v-model="valueProfile.data.nowPeriod" style="display: inline-block;"></v-switch>
          </div>
          <div v-if="!valueProfile.data.nowPeriod" class="workPicker">
            <v-menu
              ref="menuTo"
              :close-on-content-click="false"
              v-model="menuTo"
              :nudge-right="40"
              :return-value.sync="dateTo"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="valueProfile.data.periodTo"
                :loading="loading"
                label="Период по"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="valueProfile.data.periodTo"
                :loading="loading"
                color="primary"
                header-color="green lighten-1"
                ref="picker"
                :max="new Date().toISOString().substr(0, 10)"
                :min="valueProfile.data.periodWith"
                no-title
                locale="ru-ru"
                first-day-of-week="1"
                scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menuTo = false">Выйти</v-btn>
                <v-btn flat color="primary" @click="$refs.menuTo.save(valueProfile.data.periodTo)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
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
      no-data-text="Пока ничего не добавленно"
    >
      <template slot="items" slot-scope="props">
        <!--<td v-for="(value, i, key) in props.item" :key="key">{{value}}</td>-->
        <td>{{props.item.sphere}}</td>
        <td>{{props.item.organization}}</td>
        <td>{{props.item.position}}</td>
        <td>{{props.item.periodWith}}</td>
        <td>{{props.item.periodTo}}</td>
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
  name: 'work',
  data () {
    return {
      valid: false,
      date: null,
      menu: false,
      dateTo: null,
      menuTo: false,
      showSaveTable: false,
      itemsWork: ['Банки, инвестиции, лизинг', 'Маркетинг, реклама PR', 'Наука, образование', 'Производство'],
      header: [
        {
          text: 'Сфера',
          align: 'left',
          value: 'sphere'
        },
        { text: 'Организация', value: 'organization' },
        { text: 'Должность', value: 'position' },
        { text: 'Период с', value: 'period' },
        { text: 'Период по', value: 'period' },
        { text: 'Изменить/удалить', align: 'center', value: 'name', sortable: false }
      ],
      typeRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].work
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    }
  },
  methods: {
    saveToTable (i) {
      this.showSaveTable = false
      this.$store.commit('dataStore/saveDataTable', {
        key: 'work',
        index: i,
        value: {
          sphere: this.valueProfile.data.sphere,
          organization: this.valueProfile.data.organization,
          position: this.valueProfile.data.position,
          periodWith: this.valueProfile.data.periodWith,
          nowPeriod: this.valueProfile.data.nowPeriod,
          periodTo: this.valueProfile.data.nowPeriod ? this.valueProfile.data.periodTo = 'Сейчас работаю' : this.valueProfile.data.periodTo
        }
      })
    },
    editItem (item) {
      this.indexEditItem = this.valueProfile.dataTable.indexOf(item)
      this.showSaveTable = true
      for (let key in this.valueProfile.data) {
        this.valueProfile.data[key] = item[key]
      }
    },
    deleteItem (item) {
      this.$store.commit('dataStore/deleteDataTable', {
        key: 'work',
        index: this.valueProfile.dataTable.indexOf(item)
      })
      // this.valueProfile.value = ''
    },
    addItemToTable () {
      if (this.$refs.form.validate()) {
        let repeadValue = this.valueProfile.dataTable.findIndex((item, i) => {
          for (let key in this.valueProfile.data) {
            if (key === 'organization') {
              return this.valueProfile.data[key] === item[key]
            }
            // return this.valueProfile.data['organization'] === item['organization']
            // if (typeof this.valueProfile.data[key] === 'string') {
            //   return this.valueProfile.data[key] === item[key]
            // }
          }
        })
        console.log(repeadValue, this.$refs.form, this.valueProfile.data['organization'])
        if (repeadValue === -1) {
          this.$store.commit('dataStore/addDataToTable',
            {
              key: 'work',
              value: {
                sphere: this.valueProfile.data.sphere,
                organization: this.valueProfile.data.organization,
                position: this.valueProfile.data.position,
                periodWith: this.valueProfile.data.periodWith,
                nowPeriod: this.valueProfile.data.nowPeriod,
                periodTo: this.valueProfile.data.nowPeriod ? this.valueProfile.data.periodTo = 'Сейчас работаю' : this.valueProfile.data.periodTo
              }
            })
        } else {
          this.$store.commit('dataStore/showRepeat', {show: true, input: 'Организация'})
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
  .workPickerSection{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .workPicker{
    flex-basis: 33%;
    z-index: 4;
  }
  .switchPicker{
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    flex-basis: 25%;
    top: 60%;
    transform: translateY(-50%);
    z-index: 3;
  }
  @media screen and (max-width: 768px) {
    .workPicker {
      flex-basis: 100%;
    }
    .switchPicker{
      top: 115%;
    }
  }
  @media screen and (max-width: 460px) {
    .btnSection{
      margin-bottom: 0;
      margin-top: 40px;
      text-align: center;
    }
  }
</style>
