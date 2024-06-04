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
  chart: {
    type: 'bar',
    stacked: true,
    parentHeightOffset: 0,
    stackType: '50%',
    height: 500,
  },
  plotOptions: {
    bar: {
      borderRadius: 24,
      barHeight: '30%',
      horizontal: false,
      startingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    // borderColor: themeBorderColor,
    xaxis: {
      lines: { show: false },
    },
    padding: {
      top: -10,
    },
  },

  xaxis: {
    categories,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['rgba(43, 128, 255, 1)'],
  },
  fill: {
    opacity: 1,
    colors: ['rgba(43, 128, 255, 0.5)'],
  },
  tooltip: {
    y: {
      formatter(val) {
        return ` ${val.toLocaleString()} دينار`
      },
    },
  },
})

const chart = ref<VueApexChartsComponent | null>(null)

setInterval(() => {
  series.value[0].data = categories.map(() => Math.floor(Math.random() * 100000))
}, 5000)

onMounted(() => {
  const fillChart = () => {
    if (chart.value == null)
      return
    console.log(chart.value)

    // for (let index = 0; index < 8; index++)

    // chartOptions.value.xaxis.categories.push(`الشهر ${index + 1}`)

    // chart.value.updateOptions(chartOptions.value)
    series.value = [
      {
        name: 'ايراردات الشركة',
        data: [],
        fillColor: '#EB8C87',
        strokeColor: '#C23829',
      },
    ]

  // chart.value.updateSeries(series.value)
  }
})
</script>

<template>
  <VueApexCharts
    ref="chart"
    type="bar"
    height="400"
    :options="chartOptions"
    :series="series"
  />
</template>
