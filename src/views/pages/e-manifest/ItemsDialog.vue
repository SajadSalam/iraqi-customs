<script setup lang="ts">
import DeliveryOrderTabs from '../delivery-order-item/DeliveryOrderTabs.vue'
import ItemsTable from '../delivery-order-item/ItemsTable.vue'
import { Tabs } from '../delivery-order-item/types'
import axios from '@axios'
import { useEManifestStore } from '@/stores/EmanifestStore'

const EManifestStore = useEManifestStore()
const isLoading = ref(false)
interface Data {
  goodType: 1 | 2 | 3
  containers: any[]
  cars: any[]
  goods: any[]

}
const selectedTab = ref<Tabs>(Tabs.Containers)
const total = ref(0)
const currentPage = ref(1)

const data = ref<Data>({
  goodType: 1,
  containers: [],
  cars: [],
  goods: [],
})

const goodsData = ref<Data>({
  goodType: 1,
  containers: [],
  cars: [],
  goods: [],
})

const filters = ref({})

const goods = ref<any[]>([])

const getManifestData = async () => {
  if (!EManifestStore.manifest.id)
    return
  try {
    isLoading.value = true

    const { data } = await axios.get('/Manifests/items?', {
      params: {
        manifestId: EManifestStore.manifest!.id,
        take: 10,
        skip: currentPage.value - 1,
        type: EManifestStore.manifest!.goodType,
        ...filters.value,
      },
    })

    total.value = data.result.itemCount
    goodsData.value = data.result

    selectedTab.value = data.value.goodType === 2 ? Tabs.Containers : data.value.goodType === 1 ? Tabs.Cars : Tabs.Goods
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getManifestData()
})
watch(() => EManifestStore.manifest, () => {
  getManifestData()
})
watch(() => currentPage.value, () => {
  getManifestData()
})

const exludeKeys = [
  'select',
  'rfid',
  'terminal',
  'product',
  'actions',
]

const filtersChanged = val => {
  filters.value = val
  getManifestData()
}
</script>

<template>
  <VDialog
    v-model="EManifestStore.itemsDialog"
    width="1200"
  >
    <VCard
      :key="data"
      :loading="isLoading"
    >
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          بيانات المنفيست
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="EManifestStore.setItemsDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <DeliveryOrderTabs v-model="selectedTab" />
        <ItemsTable
          :data="selectedTab === Tabs.Goods ? goodsData.goods : selectedTab === Tabs.Cars ? goodsData.cars : goodsData.containers"
          :tab="selectedTab"
          :loading="isLoading"
          :exlude-keys="exludeKeys"
          @filters="filtersChanged"
          @refresh="getManifestData"
        />
        <div class="d-flex justify-end">
          <VPagination
            v-model="currentPage"
            :length="(total / 10) + 1"
            :total-visible="5"
            :disabled="isLoading"
            @change="getManifestData"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
