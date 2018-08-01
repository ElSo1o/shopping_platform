import Vue from 'vue'
import Router from 'vue-router'
import MainSection from '@/components/layout/MainSection'
import AuthUser from '@/components/layout/AuthUser'
import UserProfile from '@/components/pages/UserProfile'
import Welcome from '@/components/pages/Welcome'
import Balance from '@/components/pages/Balance'
import authUser from './verificationUser'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainSection',
      component: MainSection,
      beforeEnter: (to, from, next) => {
        authUser(to, from, next)
      }
    },
    {
      path: '/auth',
      name: 'AuthUser',
      redirect: '/auth/welcome',
      beforeEnter: (to, from, next) => {
        authUser(to, from, next)
      },
      component: AuthUser,
      children: [
        {
          path: 'profile',
          name: 'UserProfile',
          component: UserProfile
        },
        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: 'balance',
          name: 'Balance',
          component: Balance
        }
      ]
    }
  ]
})
