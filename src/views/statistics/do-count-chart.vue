<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { getRadialBarChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const vuetifyTheme = useTheme()

const statisticsChartConfig = computed(() => getRadialBarChartConfig(vuetifyTheme.current.value))

statisticsChartConfig.value.labels = [
  'منفذ سفوان',
  'منفذ الشلامجة',
  'منفذ الزبير',

]
statisticsChartConfig.value.plotOptions.radialBar.dataLabels.total.label = 'الاجمالي'

const series = ref([
  23,
  12,
  34,
])

setInterval(() => {
  series.value[0] += Math.floor(Math.random() * 20)
  series.value[1] += Math.floor(Math.random() * 20)
  series.value[2] += Math.floor(Math.random() * 20)
}, 5000)
</script>

<template>
  <VueApexCharts
    type="radialBar"
    height="400"
    :options="statisticsChartConfig"
    :series="series"
  />
</template>
