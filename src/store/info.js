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
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...toUpdate }
        await firebase.database().ref(`/crm-users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = { locale: state.info.locale }
    }
  },
  getters: {
    info: s => s.info
  }


}
