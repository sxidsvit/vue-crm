<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning'|localize}}</h3>
      <h4>{{info.bill | currency('UAH')}}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{'NoCategories'|localize}}.
      <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency('UAH')}} {{'Of'|localize}} {{cat.limit | currency('UAH') }}
        </p>
        <div class="progress" v-tooltip="{text: `${cat.tooltip}`, position: 'top'}">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template> 

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
export default {
  name: 'planning',
  metaInfo() {
    return { title: this.$title('Menu_Planning') }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      // процент остатотка средств в данной категории
      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent

      // задаем цвет прогресс бара (индикатора процесса)
      const progressColor =
        percent < 50 ? 'green' : percent < 100 ? 'yellow' : 'red'

      // остатот средств в данной категории
      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
    // debugger;
  }
}
</script>
