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
          v-if="!mobile"
        >
          <v-toolbar flat>
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="getProfileData.photoURL">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title color="primary"><h5>{{getProfileData.email}}</h5></v-list-tile-title>
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
                    <div v-if="item.sure && !item.filled">
                      <v-icon class="warningIcon">warning</v-icon>
                    </div>
                    <div v-if="item.filled">
                      <v-icon color="success">done</v-icon>
                    </div>
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div class="sectionInput">
        <v-layout class="height" v-resize="onResize" >
          <v-flex>
            <v-card>
              <v-toolbar card prominent v-if="!mobile">
                <v-toolbar-title class="body-2 grey--text" >Профиль</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn
                  icon
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>
              <v-tabs
                fixed-tabs
                color="grey lighten-4"
                icons-and-text
                v-if="mobile"
              >
                <v-tab
                  v-for="item in itemsMenu"
                  :key="item.title"
                  @click="nowComponent = item.component"
                >
                  {{ item.title }}
                  <v-icon>{{item.icon}}</v-icon>
                </v-tab>
              </v-tabs>

              <v-divider></v-divider>
              <v-card-text class="contentInputs">
                <keep-alive>
                  <component v-bind:is="nowComponent" class="inputsGroup" ref="component"></component>
                </keep-alive>
                <div class="btnSave">
                  <v-btn
                    outline
                    color="primary"
                    @click="updateProfile">
                    <p>Сохранить</p>
                    <v-progress-circular
                      :size="20"
                      color="primary"
                      indeterminate
                      style="margin-left: 8px"
                      v-show="loading"
                    ></v-progress-circular>
                  </v-btn>
                  <div>
                    <v-dialog v-model="dialog" max-width="650px">
                      <a slot="activator" v-if="nowComponent === 'personal'" style="color: #ff5252;">Удалить профиль</a>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Удаление аккаунта</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container style="padding: 10px">
                            <v-layout wrap>
                              <v-flex>
                                <v-alert
                                  :value="true"
                                  color="error"
                                  icon="warning"
                                  outline
                                >
                                  Вы уверены, что хотите удалить аккаунт? После удаления аккаунта, вам будет закрыт доступ к поиску новых вакансий. Также будет утеряна вся информация о выполненных заданиях, набранный рейтинг, информация вашего профиля и т.д
                                </v-alert>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions style="padding: 8px 24px;">
                          <v-spacer></v-spacer>
                          <v-btn color="success" @click.native="dialog = !dialog">Отмена</v-btn>
                          <v-btn color="error" @click.native="deleteProfile">Удалить</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>
                <v-snackbar
                  v-model="snackbar"
                  :color="color"
                  top
                  right
                  :multi-line="mode === 'multi-line'"
                  :timeout="timeout"
                  :vertical="mode === 'vertical'"
                >
                  {{ text }}
                  <v-btn
                    dark
                    flat
                    @click="snackbar = false"
                  >
                    Закрыть
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="showRepeat.show"
                  :color="color"
                  top
                  right
                  :multi-line="mode === 'multi-line'"
                  :timeout="3000"
                  :vertical="mode === 'vertical'"
                >
                  Поле c именем {{showRepeat.input}} одинаковые!
                  <v-btn
                    dark
                    flat
                    @click="showRepeat = {show: false, input: null} "
                  >
                    Закрыть
                  </v-btn>
                </v-snackbar>
                <v-snackbar
                  v-model="showSuccessSave.show"
                  color="success"
                  top
                  right
                  :multi-line="mode === 'multi-line'"
                  :timeout="4000"
                  :vertical="mode === 'vertical'"
                >
                  Документ {{showSuccessSave.component}} сохранен
                  <v-btn
                    dark
                    flat
                    @click="showSuccessSave = {show: false, component: null}"
                  >
                    Закрыть
                  </v-btn>
                </v-snackbar>
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
import education from '../profile_inputs/education'
import language from '../profile_inputs/language'
import hobby from '../profile_inputs/hobby'
import work from '../profile_inputs/work'
import car from '../profile_inputs/car'
import discount from '../profile_inputs/discount'
export default {
  name: 'registration',
  components: {
    personal,
    location,
    education,
    language,
    work,
    hobby,
    car,
    discount
  },
  data () {
    return {
      drawer: true,
      dialog: false,
      snackbar: false,
      color: 'error',
      mode: '',
      timeout: 6000,
      text: 'Заполните все обязательные поля',
      mini: false,
      right: null,
      nowComponent: 'personal',
      mobile: false,
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    switchComponent (component) {
      console.log(component)
    },
    updateProfile (e) {
      const updateData = this.$store.getters['dataStore/getDataInputProfile'][this.nowComponent]
      this.$store.commit('dataStore/switchLoadingInput', true)
      if (typeof updateData.dataTable !== 'undefined' && updateData.dataTable.length !== 0) {
        this.$store.dispatch('dataStore/updateUserProfile',
          {
            data: updateData,
            key: this.nowComponent,
            uid: this.$store.getters['dataStore/getUser'].uid
          })
      } else if (this.$refs.component.$refs.form.validate()) {
        this.$store.dispatch('dataStore/updateUserProfile',
          {
            data: updateData,
            key: this.nowComponent,
            uid: this.$store.getters['dataStore/getUser'].uid
          })
      } else {
        if (updateData.dataTable.length === 0) {
        }
        this.$store.commit('dataStore/switchLoadingInput', false)
        this.snackbar = true
      }
    },
    deleteProfile (e) {
      this.$store.dispatch('dataStore/deleteProfile', this.userProfile)
    },
    onResize () {
      if (window.innerWidth <= 1225) {
        this.mobile = true
      } else {
        this.mobile = false
      }
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  },
  computed: {
    getProfileData () {
      return this.$store.getters['dataStore/getAuthUser']
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    },
    userProfile () {
      return this.$store.getters['dataStore/getUser']
    },
    itemsMenu () {
      return this.$store.getters['dataStore/getItemsMenu']
    },
    showRepeat: {
      get: function () {
        return this.$store.getters['dataStore/getShowRepeat']
      },
      set: function (newValue) {
        this.$store.commit('dataStore/showRepeat', newValue)
      }
    },
    showSuccessSave: {
      get: function () {
        return this.$store.getters['dataStore/getShowSuccess']
      },
      set: function (data) {
        this.$store.commit('dataStore/showSaveSuccess', data)
      }
    }
  }
}
</script>

<style scoped>
  h3{
    font-weight: 400;
  }
  h5{
    margin: 0!important;
  }
  .contentProfileUser{
    display: flex;
    justify-content: space-between;
  }
  .sectionInput{
    width: 100%;
  }
  .warningIcon{
    color: #ff9800!important;
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
    padding: 0 14px;
  }
  .btnSave{
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 24px;
  }
  .btnSave p {
    margin: 0;
  }
  .inputsGroup{
    padding-bottom: 80px;
    /*padding-top: 15px;*/
  }
  button{
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    .btnSave{
      flex-direction: column;
      align-items: center;
    }
    .btnSave > div:last-child{
      margin-top: 15px;
    }
    .contentInputs{
      padding: 0 15px 20px 15px;
    }
  }
</style>
