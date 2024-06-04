<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts'
import type { VueApexChartsComponent } from 'vue3-apexcharts'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: '',
    data: [],
  },
])

const categories = []
for (let index = 0; index < 8; index++)
  categories.push(`الاسبوع ${index + 1}`)

const chartOptions = ref<ApexOptions>({
  // ...getBarChartConfig(vuetifyTheme.current.value),

  dataLabels: {
    enabled: false,
  },

  xaxis: {
    type: 'datetime',
    categories: ['2019-02-05T00:00:00',
      '2019-02-08T01:30:00',
      '2019-02-11T02:30:00',
      '2019-02-13T03:30:00',
      '2019-02-15T04:30:00',
      '2019-02-19T05:30:00',
      '2019-02-23T06:30:00'],
  },
  fill: {
    opacity: 1,
    colors: ['rgba(184, 0, 0, 0.5)'],
  },
  stroke: {
    show: true,
    curve: 'smooth',
    width: 2,
    colors: ['rgba(184, 0, 0, 0.6)'],
  },
  tooltip: {
    x: {
      formatter(val) {
        return ` ${val.toLocaleString()} امر تلسيم  `
      },
    },
  },
})

const chart = ref<VueApexChartsComponent | null>(null)

const fillChart = () => {
  if (chart.value == null)
    return
  console.log(chart.value)
  series.value = [
    {
      name: 'امر تسليم',
      data: []
    },
  ]
  series.value[0].data = categories.map(() => Math.floor(Math.random() * 100))

  // chart.value.updateSeries(series.value)
}

setInterval(() => {
  fillChart()
}, 5000)

onMounted(() => {
  fillChart()
})
</script>

<template>
  <VueApexCharts
    ref="chart"
    type="area"
    height="400"
    :options="chartOptions"
    :series="series"
  />
</template>
