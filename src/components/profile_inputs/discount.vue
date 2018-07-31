<template>
  <div class="discountSection">
    <div>
      <div class="headerDiscount">
        <v-form v-model="valid" ref="form" class="formInput">
          <v-text-field
            v-model="valueProfile.value"
            :loading="loading"
            :label="valueProfile.label"
            required
          ></v-text-field>
        </v-form>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
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
        :items="dataTableProfile"
        hide-actions
        class="elevation-1"
        hide-headers
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
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
      showSaveTable: false
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].discount
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    },
    dataTableProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].discount.dataArray
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.indexEditItem = this.dataTableProfile.indexOf(item)
      this.showSaveTable = true
      this.valueProfile.value = item.name
    },

    deleteItem (item) {
      const index = this.dataTableProfile.indexOf(item)
      confirm('Вы уверен что хотите удалить данные из таблицы?') && this.dataTableProfile.splice(index, 1)
      this.valueProfile.value = ''
    },
    addItemToTable () {
      if (this.valueProfile.value === '') {
        return false
      } else {
        this.dataTableProfile.unshift({name: this.valueProfile.value})
        this.valueProfile.value = ''
      }
    },
    saveToTable (i) {
      this.showSaveTable = false
      this.dataTableProfile.splice(i, 1)
      this.dataTableProfile.unshift({name: this.valueProfile.value})
      this.valueProfile.value = ''
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
