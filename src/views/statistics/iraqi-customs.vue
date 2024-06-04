<script lang="ts" setup>
import DoCountChart from './do-count-chart.vue'
import DoMoneyChart from './do-money-chart.vue'
import StocksChart from './stocks-chart.vue'
import UnfinishedDoChart from './unfinished-do-chart.vue'

const topCards = ref([
  {
    title: 'التصاريح الكمركية المنجزة',
    value: 2323,
    icon: 'tabler-receipt',
  },
  {
    title: 'الوصولات الضريبية',
    value: 1203,
    icon: 'mdi-currency-usd',
  },
  {
    title: 'التصاريح المتوقفة',
    value: 233,
    icon: 'tabler-receipt-off',
  },
  {
    title: 'الوصولات الغير مدفوعة',
    value: 300000,
    icon: 'mdi-close',
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

const selected = ref('day')
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
          <StocksChart />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard class="top-card">
        <VCardTitle class="d-flex align-center pa-3 gap-2">
          الأوامر الغير منجزة
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
          <UnfinishedDoChart />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="8"
    >
      <VCard class="top-card">
        <VCardTitle class="d-flex align-center pa-3 gap-2">
          الايرادات لكل المنفذ
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
          <DoMoneyChart />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard class="top-card">
        <VCardTitle class="d-flex align-center pa-3 gap-2">
          التصاريح المشبوها بها
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
          <DoCountChart />
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
