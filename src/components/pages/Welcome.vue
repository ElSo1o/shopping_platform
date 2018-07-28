<template>
  <div>
    <v-card-title primary-title>
      <div class="title">
        <div>
          <h2>Поздравляем с регистрацией, будущий Тайный Покупатель!</h2>
        </div>
      </div>
    </v-card-title>
    <div>
      <div class="title">
        <div>
          <h3>Осталась сделать два шага к большому успеху!</h3>
        </div>
      </div>
      <v-card-text >
        <v-stepper value="1" style="box-shadow: none">
          <v-stepper-header>
            <v-stepper-step step="1" complete>Профиль</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">Азбука</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Вакансии</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <div class="itemWelcome" >
          <div class="item" v-for="(item, i ,key) in getItemsWelcome" :key="key">
            <div class="barrier" v-if="!item.active"></div>
            <div :class="{ notActive: !item.active}">
              <h3>{{item.title}}</h3>
              <p>{{item.description}}</p>
              <div class="btnWelcome">
                <v-chip
                  v-model="chip3"
                  color="green"
                  outline
                  @click="routerPush"
                >{{item.btn.title}}<span :data-link="item.btn.link"></span></v-chip>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
export default {
  name: 'welcome',
  data () {
    return {
      chip3: true
    }
  },
  computed: {
    getItemsWelcome () {
      return this.$store.getters['dataStore/getItemsWelcome']
    }
  },
  methods: {
    routerPush (e) {
      this.$router.push({name: e.target.children[0].dataset.link})
    }
  },
  mounted: function () {
    // const user = firebase.auth().currentUser
    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     console.log(profile.providerId)
    //     console.log(profile.uid)
    //     console.log(profile.displayName)
    //     console.log(profile.email)
    //     console.log(profile.photoURL)
    //   })
    // }
  }
}
</script>

<style scoped>
  .title{
    text-align: center;
    width: 100%;
  }
  h2{
    font-size: 28px;
    font-weight: 400;
  }
  h3{
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .item{
    position: relative;
    flex-basis: 33%;
    align-self: stretch;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding: 0 12px 36px 12px;
    /*height: 275px;*/
    /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05); */
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    z-index: 1;
  }
  .itemWelcome{
    display: flex;
    align-items: flex-start;
    align-self: auto;
    justify-content: space-between;
    align-content: stretch;
  }
  .item h3{
    font-size: 24px;
  }
  .btnWelcome{
    position: absolute;
    bottom: 1%;
    left: 0;
    right: 0;
  }
  .barrier{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    background: #d0c9c96e;
    z-index: 10;
  }
  .notActive{
    opacity: 0.7;
  }
  @media screen and (max-width: 800px) {
    .itemWelcome{
      flex-wrap: wrap;
    }
    .item {
      flex-basis: 100%;
    }
  }
</style>
