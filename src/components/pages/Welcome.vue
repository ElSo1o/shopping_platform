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
        <v-stepper :value="getProfileData.profile.stepper" style="box-shadow: none">
          <v-stepper-header class="redeFineStepper">
            <div v-for="(item, i ,key) in getItemsWelcome" :key="key">
              <v-stepper-step :step="getProfileData.profile.welcome[i].stepperNumber" :complete="getProfileData.profile.welcome[i].complete" class="bgStepper">
                {{item.title}}
              </v-stepper-step>
            </div>
            <div class="hr"></div>
          </v-stepper-header>
        </v-stepper>
        <div class="itemWelcome" >
          <div class="item" v-for="(item, i ,key) in getItemsWelcome" :key="key">
            <v-card class="barrier" v-if="!getProfileData.profile.welcome[i].active" :ripple ="true"></v-card>
            <div :class="{ notActive: !getProfileData.profile.welcome[i].active}">
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
        <div>
          <h4 class="text-center">Зарабатывай и улучшай сервис с MSP4! Твои друзья, Тайные Покупатели</h4>
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
    },
    getProfileData () {
      return this.$store.getters['dataStore/getAuthUser']
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
  h3, h4{
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h4{
    font-size: 18px;
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
    /*box-shadow: inset 0 1px 1px rgba(0,0,0,.05);*/
    z-index: 1;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
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
  .redeFineStepper{
    /*flex-basis: 33%;*/
    box-shadow: none;
    position: relative;
    background: #fafafa;
  }
  .redeFineStepper > .hr{
    border:solid #0000001f;
    background: #0000001f;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 1px;
  }
  .bgStepper{
    z-index: 3;
    background-color: #fafafa
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
