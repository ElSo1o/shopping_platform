<template>
    <div>
      <div class="titleEducation">
        <h2>Населенные пункты, в которых Вы готовы работать</h2>
      </div>
      <div class="headerLocation">
        <v-form v-model="valid" ref="form" class="formInput">
            <v-text-field
              v-model="valueProfile.value"
              :loading="loading"
              :rules="nameRules"
              label="Местоположение"
              required
            >
            </v-text-field>
        </v-form>
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
        :loading="loading"
        no-data-text="Пока ничего не добавленно"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item}}</td>
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
      <gmap-map
        :center="center"
        :zoom="11"
        style="width:100%;  height: 400px;"
        :options="options"
        map-type-id="terrain"
        ref="map"
      >
        <gmap-marker :position="center">
        </gmap-marker>
      </gmap-map>
    </div>
</template>

<script>
  export default {
    name: 'location',
    data () {
      return {
        valid: false,
        showSaveTable: false,
        indexEditItem: null,
        nameRules: [
          v => !!v || 'Обязательное поле'
        ],
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null,
        options: {
          styles: [{
            'featureType': 'water',
            'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#808080'}, {'lightness': 54}]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ece2d9'}]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ccdca1'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{'color': '#767676'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{'color': '#ffffff'}]
          }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
          }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.sports_complex',
            'stylers': [{'visibility': 'on'}]
          }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.business',
            'stylers': [{'visibility': 'simplified'}]
          }]
        }
      }
    },
    computed: {
      valueProfile () {
        return this.$store.getters['dataStore/getDataInputProfile'].location
      },
      loading () {
        return this.$store.getters['dataStore/getLoadingInput']
      }
    },
    methods: {
      geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log(position)
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.$store.dispatch('dataStore/getFullAddress', this.center)
        }, error => {
          console.log(error)
          if (error.code === 1) {
            console.log('Geolocation off')
          }
        })
      },
      saveToTable (i) {
        this.showSaveTable = false
        this.$store.commit('dataStore/saveDataTable', {
          key: 'location',
          index: i,
          value: this.valueProfile.value
        })
      },
      editItem (item) {
        this.indexEditItem = this.valueProfile.dataTable.indexOf(item)
        this.showSaveTable = true
        this.valueProfile.value = item
      },
      deleteItem (item) {
        this.$store.commit('dataStore/deleteDataTable', {
          key: 'location',
          index: this.valueProfile.dataTable.indexOf(item)
        })
      },
      addItemToTable () {
        if (this.$refs.form.validate()) {
          let repeadValue = this.valueProfile.dataTable.findIndex(item => {
            for (let key in this.valueProfile) {
              if (key === 'value') {
                console.log(this.valueProfile[key], item)
                return this.valueProfile[key] === item
              }
            }
          })
          if (repeadValue === -1) {
            this.$store.commit('dataStore/addDataToTable', {key: 'location', value: this.valueProfile.value})
          } else {
            this.$store.commit('dataStore/showRepeat', true)
          }
        } else {
          return false
        }
      }
    },
    mounted: function () {
      this.geolocate()
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
  .headerLocation{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerLocation > form{
    flex-basis: 75%;
  }
  @media screen and (max-width: 600px) {
    .headerLocation{
      flex-wrap: wrap;
      justify-content: center;
    }
    .headerLocation > form{
      flex-basis: 100%;
    }
    .headerLocation > button{
      margin-bottom: 20px;
    }
  }
</style>
