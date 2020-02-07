import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty' },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main' },
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail-record',
      name: 'detail-record',
      meta: { layout: 'main' },
      component: () => import('../views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main' },
      component: () => import('../views/History.vue')
    },
    {
      path: '/planing',
      name: 'planing',
      meta: { layout: 'main' },
      component: () => import('../views/Planinig.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main' },
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main' },
      component: () => import('../views/Record.vue')
    },

  ]
})

export default router
