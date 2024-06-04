<script lang="ts" setup>
import IraqiCustoms from '@/views/statistics/iraqi-customs.vue'
import IraqiExhibitions from '@/views/statistics/iraqi-exhibitions.vue'
import PublicTransportcompanies from '@/views/statistics/public-transportcompanies.vue'

const tabs = [
  {
    title: 'المعارض العراقية',
    value: 'iraqiExhibitions',
  },
  {
    title: 'شركات العامة للنقل ',
    value: 'publicTransportCompanies',
  },
  {
    title: 'الهيئة العامة للكمارك',
    value: 'iraqiCustoms',
  },

]

const currentTab = ref<string>('publicTransportCompanies')
</script>

<template>
  <VRow>
    <VCol
      v-for="tab in tabs"
      :key="tab.value"
      cols="12"
      md="4"
      class="pa-0 px-1"
    >
      <VBtn
        block
        variant="outlined"
        :color="tab.value === currentTab ? 'primary' : 'grey'"
        @click="currentTab = tab.value"
      >
        {{ tab.title }}
      </VBtn>
    </VCol>
  </VRow>
  <IraqiExhibitions v-if="currentTab === 'iraqiExhibitions'" />
  <PublicTransportcompanies v-else-if="currentTab === 'publicTransportCompanies'" />
  <IraqiCustoms v-else-if="currentTab === 'iraqiCustoms'" />
</template>
