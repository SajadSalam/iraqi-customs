<script lang="ts" setup>
import * as signalR from '@microsoft/signalr'
import { HubConnectionBuilder } from '@microsoft/signalr'
import appsettings from '../../../public/appsettings.json'
import { tabs } from './utils'
import { formatDate } from '@/@core/utils/formatters'
import StaticTable from '@/components/StaticTable.vue'
import Steppy from '@/components/Steppy.vue'
import swAxios from '@/plugins/sw-axios'

const baseURL = appsettings['sw-baseURL']
const currentTabIndex = ref(2)

const order = ref(null)
const route = useRoute()
const id = computed(() => route.params.id)

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

  console.log(order.value.number.toString())

  connection.on(order.value.number.toString(), async message => {
    console.log(message)

    const res2 = await swAxios.get(`/customer/${id.value}/order`)

    order.value = res2.data
    currentTabIndex.value = message.operations.length
    window.document.getElementById('bell-sound').play()
  })

  // You can also play it on some event, like a button click
  window.document.getElementById('bell-sound').play()
})

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
    <VCardTitle class="text-primary text-h4 pa-5">
      تتبع سير المعاملة
    </VCardTitle>
    <VDivider />
    <VCardText>
      <Steppy
        :tabs="tabs"
        :step="currentTabIndex"
      />
    </VCardText>
  </VCard>
  <div v-if="order != null">
    <StaticTable
      :headers="headers"
      :data="order.operations"
      :loading="false"
    >
      <template #operationType="{ item }">
        <span>{{ tabs.find(v => v.id === item.operationType)?.title || "تقدم" }}</span>
      </template>
      <template #creationDate="{ item }">
        <span>{{ formatDate(item.creationDate) }}</span>
      </template>
    </StaticTable>
    <audio
      id="bell-sound"
      autoplay
      controls
      class="d-none"
      src="/bell.mp3"
    />
  </div>
</template>

<style lang="scss">
.wrapper-steppy {
  .controls {
    display: none;
  }

  .steppy-content {
    display: none !important;
  }
}
</style>
