<script lang="ts" setup>
import * as signalR from '@microsoft/signalr'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { VCardTitle } from 'vuetify/lib/components/index.mjs'
import appsettings from '../../../public/appsettings.json'
import { tabs as em, mainTabs } from './utils'
import swAxios from '@/plugins/sw-axios'
import StaticTable from '@/components/StaticTable.vue'
import { formatDate, timeToWords } from '@/@core/utils/formatters'

const baseURL = appsettings['sw-baseURL']
const currentTabIndex = ref(2)

const order = ref(null)
const route = useRoute()
const id = computed(() => route.params.id)
const tabs = ref<typeof mainTabs>([])

tabs.value = mainTabs.map(tab => ({ ...tab, value: 0 }))

const mainTab = computed(() => {
  let accumulatedIndex = 0
  for (let i = 0; i < tabs.value.length; i++) {
    const childrenCount = tabs.value[i].childern.length // Corrected typo
    if (currentTabIndex.value < accumulatedIndex + childrenCount)
      return tabs.value[i]

    accumulatedIndex += childrenCount
  }

  // Return the last tab as fallback or handle missing tab case
  return tabs.value[tabs.value.length - 1] // Corrected the index
})

watch(() => currentTabIndex.value, value => {
  // find the main tab depending on the currentTabIndex
  console.log(mainTab.value, 'cur')

  // Calculate the current progress percentage based on the tab
  const totalChildren = mainTab.value?.childern.length || 1
  const currentChildIndex = mainTab.value?.childern.findIndex(v => v.id === currentTabIndex.value) || 0

  // Calculate the percentage
  const progressPercentage = ((currentChildIndex) / totalChildren) * 100

  tabs.value.find(v => v.title === mainTab.value?.title).value = progressPercentage

  // set all previous tabs to 100%
  tabs.value.forEach((tab, index) => {
    if (index < tabs.value.findIndex(v => v.title === mainTab.value?.title))
      tab.value = 100
  })

  const box = window.document.querySelector('.progress')

  box.style.setProperty('--before-width', mainTab.value?.activeWidth || '100%')
})

onMounted(async () => {
  const res = await swAxios.get(`/customer/${id.value}/order`)

  order.value = res.data
  currentTabIndex.value = order.value.operations.length

  const connection = new HubConnectionBuilder()
    .withUrl(`${baseURL}ClearanceHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .build()

  connection.start().then(() => {
    console.log('Connected!')
  }).catch(console.error)

  connection.on(order.value.number.toString(), async message => {
    console.log(message)

    const res2 = await swAxios.get(`/customer/${id.value}/order`)

    order.value = res2.data
    currentTabIndex.value = message.operations.length
    window.document.getElementById('bell-sound').play()
  })

  // You can also play it on some event, like a button click
  // window.document.getElementById('bell-sound').play()
})

const headers = [
  { label: 'اسم الموظف', key: 'employeeName' },
  { label: 'العملية', key: 'operationType' },
  { label: 'التاريخ', key: 'creationDate' },
]

const isTabActive = (tab: number) => tab === currentTabIndex.value
const orderOperation = (index: number) => order.value.operations[index]
</script>

<template>
  <VCard
    flat
    class="bg-gradient-primary border-white "
  >
    <VCardTitle class="text-primary text-h4 pa-5">
      تتبع سير المعاملة
      {{ currentTabIndex }}
    </VCardTitle>

    <VDivider />
    <VCardText>
      <div class="stepper">
        <div
          v-for="tab in tabs"
          :key="tab.title"
          class="stepper-item"
        >
          <VProgressCircular
            :model-value="tab.value < 0 ? 100 : tab.value"
            :rotate="360"
            :size="75"
            :width="8"
            color="success"
          >
            <template #default>
              {{ tab.value }}%
            </template>
          </VProgressCircular>
          <img :src="tab.image">
          <h1>
            {{ tab.title }}
          </h1>
        </div>
        <div class="progress" />
      </div>
    </VCardText>
  </VCard>
  <VCard
    v-if="order != null"

    flat
    class="bg-gradient-primary border-white my-5 "
  >
    <VCardTitle class="text-primary text-h4 pa-5">
      تتبع سير المعاملة
    </VCardTitle>

    <VDivider />
    <VCardText>
      <VRow justify="center">
        <VCol
          v-for="(tab, i) in tabs"
          :key="`test-${i}`"
          cols="12"
          :md="(i === 0 || i === 2) ? 3 : 2"
        >
          <VCardTitle class="d-flex align-center gap-2 font-weight-bold">
            <img
              :src="tab.image"
              width="40"
              height="40"
            >
            {{ tab.title }}
          </VCardTitle>
          <VCard
            outlined
            flat
            class="border"
          >
            <VCardText class="px-4">
              <div
                v-for="(child, j) in tab.childern"
                :key="`child-${j}`"
                class="d-flex flex-column align-items-center mb-3 gap-1 "
              >
                <div class="d-flex align-center gap-2">
                  <VProgressCircular
                    :model-value="(isTabActive(j) || i < currentTabIndex) ? 100 : 0"
                    :rotate="360"
                    :size="30"
                    :width="3"
                    color="success"
                  >
                    <template #default>
                      {{ j + 1 }}
                    </template>
                  </VProgressCircular>
                  <h3
                    class="text-disabled"
                    :class="{ 'text-success': child.id < currentTabIndex, 'text-primary': child.id === (currentTabIndex) }"
                  >
                    {{ child.title }}
                  </h3>
                </div>
                <div class="mx-5">
                  <p>
                    بدأ : {{ formatDate(orderOperation(i * j)?.creationDate || '') || '--' }}
                  </p>
                  <p>
                    انتهى : {{ formatDate(orderOperation(i * j)?.endDate || '') || '--' }}
                  </p>
                  <p>
                    استغرق : {{ timeToWords(orderOperation(i * j)?. duration || null) || '--' }}
                  </p>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <div v-if="order != null">
    <StaticTable
      :headers="headers"
      :data="order.operations"
      :loading="false"
    >
      <template #operationType="{ item }">
        <span>{{ em.find(v => v.id === item.operationType)?.title || "تقدم" }}</span>
      </template>
      <template #creationDate="{ item }">
        <span>{{ formatDate(item.creationDate) }}</span>
      </template>
    </StaticTable>
  </div>
  <audio
    id="bell-sound"
    autoplay
    controls
    class="d-none"
    src="/bell.mp3"
  />
</template>

<style lang="scss">
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  .stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-inline: 40px;

    img {
      width: 75px;
      height: 75px;
      padding: 5px;
      border: 4px solid #22c36c;
      border-radius: 50%;
      background-color: white;
    }

    h1 {
      font-size: 18px;
    }
  }

  .progress {
    position: absolute;
    z-index: -1;
    top: 65%;
    width: 95%;
    height: 15px;
    border-radius: 20px;
    background-color: #ddd;

    &::before {
      position: absolute;
      z-index: -2;
      top: 0;
      right: 0;
      width: var(--before-width, 100%);
      height: 100%;
      border-radius: 20px;
      background-color: #22c36c;
      content: "";
      transition: width 0.5s;
    }
  }
}

p {
  padding: 0;
  margin: 0;
}
</style>
