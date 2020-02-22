<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'BillInCurrency'|localize}}</span>

        <p class="currency-line" v-for="cur of currencies" :key="cur">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import currencyFilter from "@/filters/currency.filter";
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  computed: {
    // вычисляем сколько денег на счету в долларах США
    base() {
      return this.$store.getters.info.bill / this.rates['UAH']
    }
  },
  methods: {
    // сколько у нас денег в разных валютах (currency)
    getCurrency(currency) {
      console.log('this.rates: ', this.rates)
      return Math.floor(this.base * this.rates[currency] * 100) / 100
    }
  }
}
</script>
