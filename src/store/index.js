import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import records from './records'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  actions: {
    async fetchCurrency() {
      // fixer.io
      // const key = process.env.VUE_APP_FIXER
      // let res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)

      // www.exchangerate-api.com 
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`)
      res = await res.json()
      return res
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, records
  }
})
