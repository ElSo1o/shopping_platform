<template>
    <div>
      <v-form v-model="valid" ref="form" class="formInput">
        <div>
          <v-text-field
            v-model="valueProfile.value"
            :loading="loading"
            :rules="nameRules"
            label="Местоположение"
            required
          >
          </v-text-field>
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
      </v-form>
    </div>
</template>

<script>
  export default {
    name: 'location',
    data () {
      return {
        valid: false,
        nameRules: [
          v => !!v || 'Введите адрес'
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
          console.log(position)
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
      }
    },
    mounted: function () {
      this.geolocate()
    }
  }
</script>

<style scoped>

</style>
