<template>
    <div>
      <h1>Location</h1>
      <v-form v-model="valid">
        <v-text-field
          v-model="valueProfile.location.dob.value"
          :rules="nameRules"
          :counter="10"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="valueProfile.location.dob.value"
          :rules="nameRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-form>
    </div>
</template>

<script>
  export default {
    name: 'location',
    data () {
      return {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ]
      }
    },
    computed: {
      valueProfile () {
        return this.$store.getters['dataStore/getDataInputProfile']
      }
    }
  }
</script>

<style scoped>

</style>
