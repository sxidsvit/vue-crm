<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>


<script>
import messages from "@/utils/messages";
export default {
  computed: {
    // если что-то меняется в геттерах, то обновляется данное вычисляемое свойство error (в этом СМЫСЛ геттерев !!! )
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    /* следим за изменением вычисляемого свойства error
     и если оно меняется. вызываем  функцию аргументом которой
     будет возвращенное геттером значение */
    error(fbError) {
      const html = messages[fbError.code];
      this.$error(html || " Что-то пошло не так ... ");
    }
  }
};
</script>
