<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const balanceChartConfig = ref({
  chart: {
    type: 'bar',
    stacked: true,
    parentHeightOffset: 0,
    stackType: '50%',
    parentHeightOffset: 0,
    height: 500,

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
  stroke: {
    show: true,
    width: 2,
    colors: ['rgba(0, 184, 0, 1)'],
  },
  fill: {
    opacity: 1,
    colors: ['rgba(0, 184, 0, 0.5)'],
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 24,
      startingShape: 'rounded',
    },
  },
  yaxis: {
    labels: {
      style: { colors: '#000', fontSize: '0.8125rem' },
    },
  },
})

// put every port in series
const series = [{
  data: [
    {
      x: 'منفذ سفوان',
      y: 23,
    },
    {
      x: 'منفذ الشلامجة',
      y: 20,
    },
    {
      x: 'منفذ الزبير',
      y: 34,
    },
    {
      x: 'منفذ أم قصر الشمالي',
      y: 10,
    },
    {
      x: 'منفذ أم قصر الجنوبي',
      y: 41,
    },
    {
      x: 'منفذ شلوي',
      y: 17,
    },
    {
      x: 'منفذ زرباطية',
      y: 36,
    },
  ],
}]

setInterval(() => {
  series[0].data = series[0].data.map(() => ({
    x: 'منفذ سفوان',
    y: Math.floor(Math.random() * 100),
  }))
}, 5000)
</script>

<template>
  <VueApexCharts
    type="bar"
    height="400"
    :options="balanceChartConfig"
    :series="series"
  />
</template>
