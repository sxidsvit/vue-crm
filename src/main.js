import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import dateFilter from '@/filters/date.filter'
import currencyFilter from "@/filters/currency.filter";
import loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

// подключаем firebase и нужные нам модули
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', loader)

// конфигурация для подключения к firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1YquE6sZxiY5gWL94OLLxEDd22sXRAfQ",
  authDomain: "asp-ads.firebaseapp.com",
  databaseURL: "https://asp-ads.firebaseio.com",
  projectId: "asp-ads",
  storageBucket: "asp-ads.appspot.com",
  messagingSenderId: "252025369069",
  appId: "1:252025369069:web:d2839a4b61b6e328f577e4"
};
// инициализация firebase
firebase.initializeApp(firebaseConfig);

// инициализируем Vue только если пользователь авторизован
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) { // инициализируем только один раз !!!
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
