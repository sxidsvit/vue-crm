<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>


<script>
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'
export default {
  computed: {
    // если что-то меняется в геттерах, то обновляется данное вычисляемое свойство error (в этом СМЫСЛ геттеров !!! )
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    /* следим за изменением вычисляемого свойства error
     и если оно меняется. вызываем  функцию аргументом которой
     будет возвращенное геттером значение */
    error(fbError) {
      const html = messages[fbError.code]
      this.$error(html || localizeFilter('Unknown error'))
      // this.$error(html || ' Что-то пошло не так ... ')
    }
  }
}
</script>
