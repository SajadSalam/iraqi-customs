<script setup lang="ts">
import { Tabs } from '../delivery-order-item/types'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'

import { isEmpty } from '@/@core/utils'
import { useManifestStore } from '@/stores/ManifestStore'
import axios from '@axios'
import DeliveryOrderTabs from '../delivery-order-item/DeliveryOrderTabs.vue'

const manifestStore = useManifestStore()
const isLoading = ref(false)
interface Data {
  goodType: 1 | 2 | 3
  containers: any[]
  cars: any[]
  goods: any[]

}
const removeData = ref([])
const selectedTab = ref<Tabs>(Tabs.Containers)

const goodsData = ref<Data>({
  goodType: 1,
  containers: [],
  cars: [],
  goods: [],
})

const getManifestData = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`Container/${manifestStore.data}/items`)

    goodsData.value.cars = data.result.cars.data
    goodsData.value.goods = data.result.goods.data
    selectedTab.value = goodsData.value.cars.length > 0 ? Tabs.Cars : Tabs.Goods
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(() => manifestStore.prductManifestDialog, () => {
  getManifestData()
})

const exludeKeys = [
  'select',
  'rfid',
  'port',
  'terminal',
  'product',
]

function closeProduct() {
  manifestStore.setproductManifestDialog(false)
  manifestStore.setDataProductManifest(removeData.value)
}
</script>

<template>
  <VDialog
    v-model="manifestStore.prductManifestDialog"
    width="1050"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          بضائع الحاوية
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="closeProduct"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText v-if="!isEmpty(goodsData.cars) || !isEmpty(goodsData.goods)">
        <DeliveryOrderTabs v-model="selectedTab" />
        <ItemsTable
          :data="selectedTab === Tabs.Goods ? goodsData.goods : goodsData.cars"
          :tab="Tabs.Cars"
          :loading="isLoading"
          :exlude-keys="exludeKeys"
        />
      </VCardText>
      <VAlert
        v-else-if="!isLoading"
        type="error"
        variant="outlined"
        border="left"
        class="ma-5"
        elevation="2"
      >
        لا يوجد بيانات
      </VAlert>
    </VCard>
  </VDialog>
</template>
