<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawerShow"
      absolute
      >
      <v-toolbar >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="getProfileData.photoURL">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title  color="primary"><h5>{{getProfileData.email}}</h5></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list>
        <v-list-tile
          v-for="item in itemsMobileMenu"
          :key="item.title"
          @click="routerPush(item)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-card flat center>
      <v-toolbar
        color="grey lighten-4"
        flat
        dense
        fixed
        style="padding: 0;"
      >
        <v-layout align-center justify-center row style="height: inherit;">
          <v-flex xl7 lg10 md10 sm12 class="headerFlex">
            <v-toolbar-title class="white--text" style="height: inherit">
              <div class="headerItems">
              <router-link :to="{name: 'Welcome'}" class="logoFlex">
                <img class="pull-left hidden-sm" src="../../assets/logo.png" alt="Mystery Shopper Platform">
                <div>
                  <span>Mystery Shopper Platform</span>
                  <small>Тайный покупатель</small>
                </div>
              </router-link>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat color="grey darken-1" class="textTransform">
                  <router-link :to="{path: `/auth/welcome`}" class="listMenuLink listMenu">Поиск вакансий</router-link>
                </v-btn>
                <v-btn flat color="grey darken-1" class="textTransform">
                  <router-link :to="{path: `/auth/welcome`}" class="listMenuLink listMenu">Сообщения</router-link>
                </v-btn>
                <v-btn flat color="grey darken-1" class="textTransform">
                  Справка
                </v-btn>
              </v-toolbar-items>
            </div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" style="height: inherit">
                <v-menu :nudge-width="70" bottom left offset-y
                        origin="top right"
                        transition="scale-transition" >
                  <v-btn flat color="grey darken-1" style="text-align: right" slot="activator" class="textTransform">
                    {{getUserData.displayName}}
                    <v-icon dark>arrow_drop_down</v-icon></v-btn>
                  <v-list dense>
                    <v-list-tile
                      v-for="(item, i, key) in items"
                      :key="key"
                      @click=""
                    >
                      <div v-if="i === items.length - 1" class="listMenu">
                        <div class="hr" v-if="i === items.length - 1"></div>
                        <v-icon dark class="litsMenuIcon">{{item.icon}}</v-icon>
                        <v-list-tile-title v-text="item.title" @click="singOut" bottom style="font-size: 14px"></v-list-tile-title>
                      </div>
                      <div v-else class="listMenu">
                        <router-link :to="{path: `/auth/${item.link}`}" class="listMenuLink listMenu">
                          <v-icon dark class="litsMenuIcon">{{item.icon}}</v-icon>
                          <v-list-tile-title v-text="item.title" bottom style="font-size: 14px"></v-list-tile-title>
                        </router-link>
                      </div>

                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-toolbar-items>
            <v-btn icon flat class="hidden-md-and-up textTransform" color="grey darken-1"  @click="drawerShow = !drawerShow">
              <v-icon dark>list</v-icon>
            </v-btn>
          <!--<v-toolbar-side-icon right color="green"></v-toolbar-side-icon>-->
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-card>
    <v-content class="contentPage">
      <v-container fluid style="padding: 12px 0 24px 0">
        <v-layout align-center justify-center row>
          <v-flex xl7 lg10 md10 sm12>
            <v-card
              color="grey lighten-5"
            >
              <div class="warningSection" v-if="getProfileData.profile.stepper === 1">
                <router-link :to="{name: 'UserProfile'}">
                  <v-icon dark class="warningSectionIcon">info</v-icon>
                  <h4>Для начала работы Вам необходимо заполнить профиль</h4>
                </router-link>
              </div>
            </v-card>
            <v-card
              color="grey lighten-5"
            >
              <router-view></router-view>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'auth-user',
  data () {
    return {
      items: [
        {
          title: 'Баланс',
          link: 'balance',
          icon: 'account_balance'
        },
        {
          title: 'Профиль',
          link: 'profile',
          icon: 'account_circle'
        },
        {
          title: 'Выйти',
          link: '',
          icon: 'exit_to_app'
        }
      ],
      drawerShow: false,
      itemsMobileMenu: [
        { title: 'Главная', icon: 'dashboard', link: 'welcome' },
        { title: 'Профиль', icon: 'account_box', link: 'profile' },
        { title: 'Баланс', icon: 'gavel', link: 'balance' }
      ]
    }
  },
  computed: {
    getUserData () {
      return this.$store.getters['dataStore/getUser']
    },
    getProfileData () {
      return this.$store.getters['dataStore/getAuthUser']
    }
  },
  methods: {
    singOut () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('dataStore/singInUser', {displayName: null})
        setTimeout(() => { this.$router.push({name: 'MainSection'}) }, 0)
      }).catch(err => console.log(err))
    },
    routerPush (item) {
      this.$router.push(`/auth/${item.link}`)
    }
  }
}
</script>

<style scoped>
  .logoFlex{
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
  .logoFlex > div{
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    color: #777;
  }
  .logoFlex > div span{
    font-size: 18px;
    line-height: 20px;
  }
  .logoFlex > div small{
    font-size: 14px;
  }
  img{
    height: 36px;
  }
  .header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
  }
  .headerFlex{
    /*margin: 0 auto;*/
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .headerFlex .headerItems{
    display: flex;
    height: inherit;
  }
  .textTransform{
    text-transform: none;
  }
  .hr{
    border-bottom: 1px solid #e5e5e5;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .listMenu{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .litsMenuIcon{
    color: inherit!important;
    padding-right: 4px;
    font-size: 20px!important;
  }
  .listMenuLink{
    text-decoration: none;
    color: inherit!important;
  }
  .contentPage{
    background: #e9eaed;
    padding-top: 48px!important;
  }
  .warningSection{
    margin-bottom: 12px;
    text-align: left;
    padding: 16px;
  }
  .warningSection > a{
    text-decoration: none;
    color: inherit;
    transition: 0.5s;
    display: inline-flex;
    align-items: center;
  }
  .warningSection > a:hover{
    color: #1e88e5;
  }
  .warningSection h4{
    margin: 0;
    font-weight: 400;
  }
  .warningSectionIcon{
    color: red!important;
    margin-right: 4px;
  }
</style>
