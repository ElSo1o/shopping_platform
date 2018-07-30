<template>
  <div>
    <div class="contentProfileUser">
      <div>
        <v-navigation-drawer
          permanent
          class="blue-grey lighten-5"
          :mini-variant.sync="mini"
          v-model="drawer"
          hide-overlay
          stateless
        >
          <v-toolbar flat>
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="getProfileData.photoURL">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title><h5>{{getProfileData.email}}</h5></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn
                    icon
                    @click.stop="mini = !mini"
                  >
                    <v-icon>chevron_left</v-icon>
                    <!--<v-icon>chevron_left</v-icon>-->
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list dense class="pt-0">
            <v-list-tile
              v-for="item in itemsMenu"
              :key="item.title"
              @click="nowComponent = item.component"
              :ripple="true"
            >
              <v-list-tile-action :data-component="item.component">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="menuProfile">
                    <span>{{ item.title }}</span>
                    <div v-if="item.sure">
                      <v-icon class="warningIcon">warning</v-icon>
                    </div>
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div class="sectionInput">
        <v-layout class="height">
          <v-flex>
            <v-card class="height">
              <v-toolbar card prominent>
                <v-toolbar-title class="body-2 grey--text">Профиль</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="updateProfile"
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>

              <v-divider></v-divider>

              <v-card-text class="contentInputs">
                <keep-alive>
                  <component v-bind:is="nowComponent"></component>
                </keep-alive>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

      </div>
    </div>
  </div>
</template>

<script>
import personal from '../profile_inputs/personal'
import location from '../profile_inputs/location'
export default {
  name: 'registration',
  components: {
    personal,
    location
  },
  data () {
    return {
      drawer: true,
      itemsMenu: [
        { title: 'Основная информация', icon: 'dashboard', sure: true, component: 'personal' },
        { title: 'Местанахождения', icon: 'room', sure: true, component: 'location' },
        { title: 'Образование', icon: 'school', component: 'education' },
        { title: 'Работа', icon: 'work', component: 'work' },
        { title: 'Интересы', icon: 'nature_people', component: 'hobby' },
        { title: 'Личный транспорт', icon: 'directions_car', component: 'car' },
        { title: 'Дисконтные программы', icon: 'timeline', component: 'discount' }
      ],
      mini: false,
      right: null,
      nowComponent: 'personal'
    }
  },
  methods: {
    switchComponent (component) {
      console.log(component)
    },
    updateProfile (e) {
      console.log(this.$store.getters['dataStore/getDataInputProfile'].location.dob)
      this.$store.dispatch('dataStore/updateUserProfile', this.nowComponent)
    }
  },
  computed: {
    getProfileData () {
      return this.$store.getters['dataStore/getAuthUser']
    }
  }
}
</script>

<style scoped>
  h3{
    font-weight: 400;
  }
  .contentProfileUser{
    display: flex;
    justify-content: space-between;
  }
  .sectionInput{
    width: 100%;
  }
  .warningIcon{
    color: #ff9800;
  }
  .menuProfile{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .height{
    height: 100%;
    box-shadow: none;
  }
  .contentInputs{
    height: 100%;
    padding: 0 24px;
  }
</style>
