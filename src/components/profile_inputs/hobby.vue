<template>
    <v-form v-model="valid" ref="form" class="formInput mainHobby">
      <div>
        <div v-for="(item, i, key) in valueProfile.itemsValueFirst" :key="key">
          <v-checkbox
            v-model="item.value"
            :label="item.name"
            color="success"
            value="success"
            hide-details
          ></v-checkbox>
        </div>
      </div>
      <div>
        <div v-for="(item, i, key) in valueProfile.itemsValueSecond" :key="key">
          <v-checkbox
            v-model="item.value"
            :label="item.name"
            color="success"
            value="success"
            hide-details
          ></v-checkbox>
        </div>
      </div>
    </v-form>
</template>

<script>
export default {
  name: 'hobby',
  data () {
    return {
      valid: false
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].hobby
    }
  }
}
</script>

<style scoped>
  .mainHobby{
    display: flex;
    justify-content: space-between;
  }
  .mainHobby > div:first-child, .mainHobby > div:last-child{
    flex-basis: 45%;
  }
</style>
