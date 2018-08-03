<template>
  <div class="discountSection">
    <div>
      <div class="headerDiscount">
        <v-form v-model="valid" ref="form" class="formInput">
          <v-text-field
            v-model="valueProfile.data.discountValue"
            :loading="loading"
            label="Дисконтная карта"
            :rules="rules"
            required
          ></v-text-field>
        </v-form>
        <v-spacer></v-spacer>
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
        hide-headers
        no-data-text="Пока ничего не добавленно"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.discountValue }}</td>
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
  </div>
</template>

<script>
export default {
  name: 'discount',
  data () {
    return {
      valid: false,
      indexEditItem: null,
      dialog: false,
      showSaveTable: false,
      rules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].discount
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    saveToTable (i) {
      this.showSaveTable = false
      this.$store.commit('dataStore/saveDataTable', {
        key: 'discount',
        index: i,
        value: {
          discountValue: this.valueProfile.data.discountValue
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
        key: 'discount',
        index: this.valueProfile.dataTable.indexOf(item)
      })
      // this.valueProfile.value = ''
    },
    addItemToTable () {
      if (this.$refs.form.validate()) {
        let repeadValue = this.valueProfile.dataTable.findIndex((item, i) => {
          for (let key in this.valueProfile.data) {
            return this.valueProfile.data[key] === item[key]
          }
        })
        console.log(repeadValue)
        if (repeadValue === -1) {
          this.$store.commit('dataStore/addDataToTable',
            {
              key: 'discount',
              value: {
                discountValue: this.valueProfile.data.discountValue
              }
            })
        } else {
          this.$store.commit('dataStore/showRepeat', {show: true, input: this.$refs.form.$children[repeadValue].$el.getElementsByTagName('label')[0].innerText})
        }
      } else {
        return false
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .discountSection{
    padding-top: 20px;
  }
  .headerDiscount{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .titleEducation h2{
    font-weight: 400;
  }
  .formInput{
    flex-basis: 50%;
  }
  button{
    margin: 0;
  }
</style>
