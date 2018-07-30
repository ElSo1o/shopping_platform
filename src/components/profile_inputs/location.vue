<template>
    <div>
      <h1>Location</h1>
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
