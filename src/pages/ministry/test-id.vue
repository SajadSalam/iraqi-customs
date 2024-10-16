<script lang="ts" setup>
import * as signalR from '@microsoft/signalr'
import { HubConnectionBuilder } from '@microsoft/signalr'
import Wizard from 'form-wizard-vue3'
import appsettings from '../../../public/appsettings.json'
import type { OperationType } from './utils'
import { mainTabs, tabs } from './utils'
import swAxios from '@/plugins/sw-axios'
import { formatDate } from '@/@core/utils/formatters'

const baseURL = appsettings['sw-baseURL']
const currentTabIndex = ref(0)

const findTabIndex = (operationType: OperationType) => {
  for (let i = 0; i < mainTabs.length; i++) {
    for (let j = 0; j < mainTabs[i].childern.length; j++) {
      if (mainTabs[i].childern[j].id === operationType) {
        if (i == 0)
          return j
        const tabsBefore = mainTabs.slice(0, i - 1).reduce((accum, i) => accum + i.childern.length, 0)

        return tabsBefore + j // Return the index of the main tab
      }
    }
  }

  return 0 // Default value if not found
}

const totalTabs = mainTabs.length

const lineWidth = computed(() => {
  const currentIndex = findTabIndex(currentTabIndex.value)
  const tabsCount = mainTabs.reduce((accum, i) => accum + i.childern.length, 0)

  const progressBarWidth = ((currentIndex) / tabsCount) * 100

  return `${progressBarWidth}%`
})

const wizard = ref(null)

const order = ref(null)
const route = useRoute()
const id = computed(() => route.params.id)

onMounted(async () => {
  const res = await swAxios.get(`/customer/${id.value}/order`)

  order.value = res.data
  currentTabIndex.value = order.value.orderOperations.length

  const connection = new HubConnectionBuilder()
    .withUrl(`${baseURL}ClearanceHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .build()

  connection.start().catch(console.error)
  connection.on(order.value.number.toString(), async message => {
    console.log(message)

    const res2 = await swAxios.get(`/customer/${id.value}/order`)

    order.value = res2.data
    currentTabIndex.value = message.orderOperations.length
  })
})

watch(currentTabIndex, () => {
  nextTick(() => {
    wizard.value.changeTab(currentTabIndex.value - 1)
  })
})
watch(lineWidth, () => {
  nextTick(() => {
  })
})

const tabChange = index => {
  currentTabIndex.value = index
}

const headers = [
  { label: 'اسم الموظف', key: 'employeeName' },
  { label: 'العملية', key: 'operationType' },
  { label: 'التاريخ', key: 'creationDate' },

]
</script>

<template>
  <VCard
    flat
    class="bg-gradient-primary border-white "
  >
    <VCardTitle class="text-primary text-h5 mb-3">
      تتبع سير المعاملة
    </VCardTitle>
    <VDivider />
    <VCardText class="mt-5">
      <div class="stepper ">
        <div class="d-flex justify-space-between">
          <div
            v-for="(tab, index) in mainTabs"
            :key="tab.title"
            class="stepper-item d-flex flex-column align-center gap-2"
          >
            <img
              class="stepper-item-icon"
              :src="tab.image"
              width="75"
            >
            <span>{{ tab.title }}</span>
          </div>
        </div>
        <div class="progress" />
      </div>
    </VCardText>
  </VCard>
  <div
    v-for="mainTab in mainTabs"
    :key="mainTab.title"
    class="d-flex gap-5 my-3"
  >
    {{
      mainTab.title
    }}
    <VBtn
      v-for="tab in mainTab.childern"
      :key="tab.id"
      @click="tabChange(tab.id)"
    >
      {{ tab.title }}
    </VBtn>
  </div>

  <Wizard
    ref="wizard"
    :custom-tabs="tabs"
    navigable-tabs
    hide-buttons
    :start-index="0"
    title="العمليات"
    @change="tabChange"
  />

  <div v-if="order != null">
    <StaticTable
      :headers="headers"
      :data="order.orderOperations"
      :loading="false"
    >
      <template #operationType="{ item }">
        <span>{{ tabs.find(v => v.id == item.operationType)?.title || "تقدم" }}</span>
      </template>
      <template #creationDate="{ item }">
        <span>{{ formatDate(item.creationDate) }}</span>
      </template>
    </StaticTable>
  </div>
</template>

<style lang="scss">
.stepper {
  position: relative;
  width: 100%;
  border-radius: 10px;

  .stepper-item {
    .stepper-item-icon {
      padding: 5px;
      border: 4px solid #22c36c;
      border-radius: 50%;
      background: #fff;
    }
  }

  .progress {
    position: absolute;
    z-index: -1;
    top: 27%;
    right: 0;
    width: 50px;
    width: calc(5.6% + 5.6% * 2);
    max-width: 97%;
    height: 13px;
    border-radius: 15px;
    background-color: #22c36c;
    content: "";
    transition: width 0.5s;
  }
}
</style>
