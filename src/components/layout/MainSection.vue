<template>
  <v-app>
    <v-toolbar dark dense color="primary">
      <v-toolbar-title class="white--text">main page</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-menu :nudge-width="100" bottom right offset-y auto>-->
        <!--<v-btn  slot="activator">-->
          <!--<v-bottom-sheet-transition>Вход</v-bottom-sheet-transition>-->
          <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
        <!--<v-list>-->
          <!--<v-list-tile-->
            <!--v-for="(item, i, key) in itemToolbar"-->
            <!--:key="key"-->
            <!--@click="">-->
            <!--<v-list-tile-title v-text="item.title" @click="dialog = true" bottom></v-list-tile-title>-->
          <!--</v-list-tile>-->
        <!--</v-list>-->
      <!--</v-menu>-->
    </v-toolbar>
    <v-content class="contentSection">
      <v-container fluid style="height: 100%">
        <div class="mainContent">
          <h2>Войдите для ознакомления с работой</h2>
          <v-btn @click.native="dialog = true" color="primary">Войти</v-btn>
        </div>
        <v-dialog v-model="dialog"
                  width="600px"
                  color="blue lighten-4"
                  transition="dialog-bottom-transition">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="headline">Войти с помощью</h3>
            </div>
            <div>
              <div class="singIn" @click="signInWithGoogle">
                <img src="http://d33wubrfki0l68.cloudfront.net/baeb7e8ccfda30b9fdf4e624abf2ba0bbe85db7b/6c980/img/google.png" alt="Google">
                <br>
                <p>Google</p>
              </div>
            </div>
            <div>
              <v-btn color="primary" flat @click.native="dialog = false">Закрыть</v-btn>
            </div>
            <div>
            </div>
          </div>
        </v-dialog>
      </v-container>
    </v-content>
    <v-footer app dark color="primary"></v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'main-section',
  data () {
    return {
      dialog: false,
      itemToolbar: [
        { title: 'Вход' }
      ]
    }
  },
  methods: {
    showModalWindow () {
      this.dialog = true
    },
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then(result => {
        console.log(result)
        // function writeUserData(userId, name, email, imageUrl) {
        //   firebase.database().ref('users/' + userId).set({
        //     username: name,
        //     email: email,
        //     profilePicture : imageUrl
        //   })
        // }
        this.$store.dispatch('dataStore/singInUser', result)
        // setTimeout(() => { this.$router.push({name: 'AuthUser'}) }, 0)
        // this.user = result.user
      }).catch(err => console.log(err))
    }
  },
  mounted: function () {
  }
}
</script>

<style>
*{
  font-size: 14px;
  line-height: 1.42857143;
}
h1, h2, h3 {
  font-weight: normal;
  margin: 20px 0 10px 0;
}
.modal-content{
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-content .singIn {
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
  text-align: center;
}
.modal-content .singIn:hover {
  color: #4CAF50;
}
.contentSection{
  background: #f0ffff;
}
.mainContent {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mainContent > h2 {
  font-size: 21px;
}
</style>
