//Custom plugin for Vue.js 
export default {
  install(Vue, options) {

    Vue.prototype.$message = function (html) {
      // M.toast({ html: html })
      // M.toast({ html, displayLength: 400 })
      M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  }
}
