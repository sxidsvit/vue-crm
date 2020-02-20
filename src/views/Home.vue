<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill'|localize}}</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  metaInfo() {
    return { title: this.$title('Menu_History') }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill,
    HomeCurrency
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted() {
    // обращение к сервису fixer.io
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  }
}
</script>
