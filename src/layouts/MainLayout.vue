<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen  = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          v-tooltip="{text: 'Cоздать новую запись', position: 'left'}"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    // если что-то меняется в геттерах, то обновляется данное вычисляемое свойство error (в этом СМЫСЛ геттерев !!! )
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    /* следим за изменением вычисляемого свойства error
     и если оно меняется. вызываем  функцию аргументом которой
     будет возвращенное геттером значение */
    error(fbError) {
      const html = messages[fbError.code]
      this.$error(html || ' Что-то пошло не так ... ')
    }
  }
}
</script>
