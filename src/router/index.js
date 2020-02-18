import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planinig.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Record.vue')
    },

  ]
})

router.beforeEach((to, from, next) => {
  // проверяем авторизовался (залогинился) пользователь
  const currentUser = firebase.auth().currentUser
  //  получаем метаданные маршрута на который нужно перейти
  // (требует ли он авторизации пользователя)
  const requareAuth = to.matched.some(record => record.meta.auth)

  if (requareAuth && !currentUser) {
    // отсылаем на страницу логина
    next('/login?message=login')
  } else {
    // разрешаем переход по выбранному маршруту
    next()
  }
})


export default router
