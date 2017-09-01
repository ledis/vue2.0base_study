import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import content from '@/components/content'
import user from '@/components/user'
import login from '@/components/login'
import publish from '@/components/publish'
import personal from '@/components/personal'
import message from '@/components/message'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        console.log(savedPosition)
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
  routes: [
    {
      path: '/vueproject',
      name: 'home',
      component: home
    },
    {
      path: '/vueproject/content',
      name: 'content',
      component: content
    },
    {
      path: '/vueproject/user',
      name: 'user',
      component: user
    },
    {
      path: '/vueproject/login',
      name: 'login',
      component: login
    },
    {
      path: '/vueproject/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/vueproject/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/vueproject/message',
      name: 'message',
      component: message
    }
  ]
})
