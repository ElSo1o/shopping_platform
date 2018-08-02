<template>
    <div>
      <div class="titleEducation">
        <h2>Образование, специальность</h2>
      </div>
      <v-form v-model="valid" ref="form" class="formInput">
        <div>
          <v-select
            :items="itemsType"
            :loading="loading"
            v-model="valueProfile.type"
            :rules="typeRules"
            label="Тип"
          ></v-select>
          <v-select
            :items="itemsLevel"
            :loading="loading"
            v-model="valueProfile.level"
            :rules="typeRules"
            label="Уровень"
          ></v-select>
          <v-text-field
            v-model="valueProfile.institute"
            :loading="loading"
            :rules="typeRules"
            label="Учебное заведение"
            required
          ></v-text-field>
          <v-text-field
            v-model="valueProfile.specialty"
            :loading="loading"
            label="Специальность"
            required
          ></v-text-field>
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
        no-data-text="Пока ничего не добавленно"
        :loading="loading"
      >
        <template slot="items" slot-scope="props">
          <!--<td v-for="(value, i, key) in props.item" :key="key">{{value}}</td>-->
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
          </v-flex>
          <td>{{props.item.type}}</td>
          <td>{{props.item.level}}</td>
          <td>{{props.item.institute}}</td>
          <td>{{props.item.specialty}}</td>
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
  name: 'education',
  data () {
    return {
      valid: false,
      showSaveTable: false,
      itemsType: ['Техническое', 'Гуманитарное', 'Медицинское', 'Другое'],
      itemsLevel: ['Среднее', 'Средне-специальное', 'Неоконченное высшее', 'Высшее', 'Научная степень'],
      header: [
        {
          text: 'Тип',
          align: 'left',
          value: 'type'
        },
        { text: 'Уровень', value: 'level' },
        { text: 'Учебное заведение', value: 'institute' },
        { text: 'Специальность', value: 'specialty' },
        { text: 'Изменить/удалить', value: 'name', sortable: false }
      ],
      typeRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].education
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    }
  },
  methods: {
    saveToTable (i) {
      this.showSaveTable = false
      this.$store.commit('dataStore/saveDataTable', {
        key: 'education',
        index: i,
        value: {
          type: this.valueProfile.type,
          level: this.valueProfile.level,
          institute: this.valueProfile.institute,
          specialty: this.valueProfile.specialty
        }
      })
    },
    editItem (item) {
      this.indexEditItem = this.valueProfile.dataTable.indexOf(item)
      this.showSaveTable = true
      for (let key in this.valueProfile) {
        if (typeof this.valueProfile[key] === 'string') {
          this.valueProfile[key] = item[key]
        }
      }
    },
    deleteItem (item) {
      this.$store.commit('dataStore/deleteDataTable', {
        key: 'education',
        index: this.valueProfile.dataTable.indexOf(item)
      })
      // this.valueProfile.value = ''
    },
    addItemToTable () {
      if (this.$refs.form.validate()) {
        let repeadValue = this.valueProfile.dataTable.findIndex(item => {
          for (let key in this.valueProfile) {
            if (typeof this.valueProfile[key] === 'string') {
              return this.valueProfile[key] === item[key]
            }
          }
        })
        console.log(repeadValue)
        if (repeadValue === -1) {
          this.$store.commit('dataStore/addDataToTable',
            {
              key: 'education',
              value: {
                type: this.valueProfile.type,
                level: this.valueProfile.level,
                institute: this.valueProfile.institute,
                specialty: this.valueProfile.specialty
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
</style>
