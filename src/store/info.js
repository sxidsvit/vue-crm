import firebase from 'firebase/app'

export default {

  state: {
    info: {}
  },

  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const snapshot = await firebase.database().ref(`/crm-users/${uid}/info`).once('value')
        const info = snapshot.val()
        commit('setInfo', info)
      } catch (e) {

      }
    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  getters: {
    info: s => s.info
  }


}
