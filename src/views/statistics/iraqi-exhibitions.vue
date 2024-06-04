<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import BarChart from './bar-chart.vue'
import HorChart from './hor-chart.vue'
import { getDonutChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const topCards = ref([
  {
    title: 'إجازة استيراد',
    value: 23000,
    icon: 'mdi-account',
  },
  {
    title: 'هوية مستورد',
    value: 400000,
    icon: 'mdi-id-card',
  },
  {
    title: 'هوية مصدر',
    value: 13000,
    icon: 'mdi-export',
  },
  {
    title: 'هوية مصدر حكومي',
    value: 2000,
    icon: 'mdi-account-tie',
  },
])

onMounted(() => {
  setInterval(() => {
    topCards.value = topCards.value.map(card => ({
      ...card,
      value: card.value + Math.floor(Math.random() * 100),
    }))
  }, 5000)
})

const vuetifyTheme = useTheme()

const expenseRationChartConfig = computed(() => getDonutChartConfig(vuetifyTheme.current.value, []))

const series = ref([85, 16, 50, 50])

const selected = ref('day')

const refreshStats = () => {
  series.value = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}
</script>

<template>
  <VRow>
    <VCol
      v-for="card in topCards"
      :key="card.title"
      cols="12"
      md="3"
    >
      <VCard class="top-card">
        <VCardTitle>
          <div class="d-flex align-center mt-2 gap-5">
            <div class="top-card pa-2 rounded-circle">
              <VIcon
                color="primary"
                size="30"
              >
                {{ card.icon }}
              </VIcon>
            </div>
            <div>
              <h2 class="ml-2">
                {{ card.value.toLocaleString() }}
              </h2>

              <h6 class="ml-2">
                {{ card.title }}
              </h6>
            </div>
            <VSpacer />
          </div>
        </VCardTitle>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard class="top-card">
        <VCardTitle class="d-flex align-center pa-3 gap-2">
          الايرادات الكلية
          <VSpacer />
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-calendar-week
            </VIcon>
            اسبوعياً
          </VBtn>
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-download
            </VIcon>
            تحميل
          </VBtn>
        </VCardTitle>
        <VCardText>
          <BarChart />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard class="top-card">
        <VCardTitle class="d-flex align-center pa-3 gap-2">
          احصائيات إجازة الاستيراد
          <VSpacer />
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-calendar-week
            </VIcon>
            اسبوعياً
          </VBtn>
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-download
            </VIcon>
            تحميل
          </VBtn>
        </VCardTitle>
        <VCardText>
          <HorChart />
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard class="top-card ">
        <VCardTitle class="pa-3 d-flex gap-2">
          الوضع العام حسب المحافظة
          <VSpacer />
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-calendar-week
            </VIcon>
            اسبوعياً
          </VBtn>
          <VBtn
            color="primary"
            variant="outlined"
          >
            <VIcon>
              mdi-download
            </VIcon>
            تحميل
          </VBtn>
        </VCardTitle>
        <VCardText class="my-5 bg-white pa-3 mx-5 rounded">
          <VRow>
            <VCol
              cols="12"
              md="4"
            >
            <h3>
              اختر المحافظة
            </h3>
              <IraqMap @refresh="refreshStats" />
            </VCol>
            <VDivider vertical />
            <VCol
              cols="12"
              md="8"
            >
              <VueApexCharts
                type="donut"
                height="410"
                :options="expenseRationChartConfig"
                :series="series"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.top-card {
  display: flex;
  flex-direction: column;
  border: 3px solid rgba(252, 252, 253, 100%);
  background-color: rgba($color: #fff, $alpha: 24%);
  box-shadow: none !important;
}
</style>
