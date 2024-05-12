<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { getBarChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const vuetifyTheme = useTheme()

const horizontalBarChartConfig = computed(() => getBarChartConfig(vuetifyTheme.current.value))

const config = ref({
  ...horizontalBarChartConfig.value,

})

const series = [{ name: '', data: [700, 350, 480, 600, 210, 550, 150], color: 'rgba(0, 134, 54, 0.5)' }]
</script>

<template>
  <VueApexCharts
    type="bar"
    height="400"
    :options="config"
    :series="series"
  />
</template>
