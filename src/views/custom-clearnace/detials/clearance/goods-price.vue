<script lang="ts" setup>
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import { Tabs } from '@/views/pages/delivery-order-item/types'

interface Props {
  clearance: ClearanceDetails
  deliveryOrder: any
  deliveryItems: any
}
const props = defineProps<Props>()
const clearance = computed<ClearanceDetails>(() => props.clearance)
const deliveryOrder = computed(() => props.deliveryOrder)
const deliveryItems = computed(() => props.deliveryItems)
const itemsTab = ref<Tabs>(Tabs.Cars)

const hsCodes = [
  {
    code: '85 44 20 90',
    percentage: 0.15,
    usd: 1,
  },
  {
    code: '85 46 90 00',
    percentage: 0.15,
    usd: 1,
  },
  {
    code: '86 01 10 00',
    percentage: 0.15,
    usd: 1,
  },
  {
    code: '86 02 99 00',
    percentage: 0.15,
    usd: 1,
  },
  {
    code: '86 05 00 00',
    percentage: 0.15,
    usd: 1,
  },
]

const goodsData = computed(() => {
  let data = []
  if (deliveryItems.value.cars.length > 0) {
    data = deliveryItems.value.cars
    itemsTab.value = Tabs.Cars
  }
  else if (deliveryItems.value.containers.length > 0) {
    data = deliveryItems.value.containers
    itemsTab.value = Tabs.Containers
  }
  else if (deliveryItems.value.goods.length > 0) {
    data = deliveryItems.value.goods
    itemsTab.value = Tabs.Goods
  }
  else {
    itemsTab.value = Tabs.Cars
  }
  data.forEach(item => {
    item.hs = hsCodes[Math.floor(Math.random() * hsCodes.length)]
  })

  return data
})

const itemName = item => {
  if (itemsTab.value === Tabs.Cars)
    return `${item.vinNo} - ${item.carBrand}`

  else if (itemsTab.value === Tabs.Containers)
    return item.number

  else
    return item.description || item.goodsDetails
}

const headers = [
  {
    label: 'وصف البضاعة ووصفها',
    key: 'name',
  },
  {
    label: 'كمية البضاعة',
    key: 'quantity',
  },
  {
    label: 'رمز المنسق',
    key: 'hs.code',
  },
  {
    label: 'النسبة',
    key: 'hs.percentage',
  },
  {
    label: 'القيمة الدولارية',
    key: 'hs.usd',
  },
  {
    label: 'سعر التخمين الكمركي بالدولار',
    key: 'customsPrice',
  },
  {
    label: 'سعر التخمين الكمركي بالدينار',
    key: 'customsPriceIQD',
  },
]

const customPrice = item => {
  return (clearance.value.certificate.usdPrice * item.quantity) * item.hs.percentage
}

const totalCustomPriceUSD = computed(() => {
  return goodsData.value.reduce((acc, item) => acc + customPrice(item), 0)
})
</script>

<template>
  <div class="mt-5">
    <div class="d-flex my-2 gap-5">
      <VAlert class="primary-with-border text-h4 ">
        <div class="d-flex">
          <span>
            المجموع الكلي للتخمين بالدولار
          </span>
          <VSpacer />
          {{ clearance.totalUsdAmount.toLocaleString() }} USD
        </div>
      </VAlert>
      <VAlert class="secondary-with-border text-h4 ">
        <div class="d-flex">
          <span>
            المجموع الكلي للتخمين بالدينار
          </span>
          <VSpacer />
          {{ clearance.totalIqdAmount.toLocaleString() }} IQD
        </div>
      </VAlert>
    </div>
    <StaticTable
      :headers="headers"
      :data="goodsData"
      :loading="false"
    >
      <template #name="{ item }">
        {{ itemName(item) }}
      </template>
      <template #customsPrice="{ item }">
        {{ customPrice(item).toLocaleString() }} USD
      </template>
      <template #customsPriceIQD="{ item }">
        {{ (customPrice(item) * 1320).toLocaleString() }} IQD
      </template>
    </StaticTable>
  </div>
</template>
