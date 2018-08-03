<template>
  <div id="app">
    <div class="spinner" v-if="storeSpinner">
      <v-progress-circular
        :size="50"
        color="green"
        indeterminate
      >
      </v-progress-circular>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      showSpinner: false
    }
  },
  computed: {
    storeSpinner () {
      return this.$store.getters['dataStore/getSpinner'].show
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  min-height: 100%!important;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.spinner{
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.btnSection{
  text-align: right;
  margin-bottom: 20px;
}
.btnSection > button{
  margin: 0;
  z-index: 3;
}
.mainHobby label{
  font-size: 14px!important;
}
</style>
