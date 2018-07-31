<template>
  <div>
    <div class="titleEducation">
      <h2>Владение автомобилями</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput mainHobby">
      <div v-for="(item, i, key) in valueProfile.inputs" :key="key">
        <div>
          <v-text-field
            v-model="item.value"
            :loading="loading"
            :label="item.label"
            :rules="validate"
            required
          ></v-text-field>
        </div>
      </div>
      <div>
        <v-checkbox
          v-model="valueProfile.guarantee.value"
          :label="valueProfile.guarantee.label"
          hide-details
        ></v-checkbox>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'car',
    data () {
      return {
        valid: false,
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
