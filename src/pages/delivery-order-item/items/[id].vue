<script setup lang="ts">
import { isNullOrUndefined } from '@/@core/utils'
import router from '@/router'
import { useTableStore } from '@/stores/AppTableStore'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import DeliveryOrderTabs from '@/views/pages/delivery-order-item/DeliveryOrderTabs.vue'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'
import { CarHeaders, ContainerHeaders, GoodsHeaders } from '@/views/pages/delivery-order-item/constants'
import { Tabs } from '@/views/pages/delivery-order-item/types'
import axios from '@axios'

const route = useRoute()
const id = computed(() => route.params.id)
const deliveryOrderStore = useDeliveryOrderStore()

const selectedTab = computed<Tabs>({
  get() {
    return deliveryOrderStore.tab
  },
  set(value) {
    deliveryOrderStore.tab = value
  },
})

const isLoading = ref(false)
interface GoodsData {
  data: any[]
}

const data = ref<{
  cars: GoodsData
  containers: GoodsData
  goods: GoodsData
}>({
  cars: {
    data: [],
  },
  containers: {
    data: [],
  },
  goods: {
    data: [],
  },
})

interface Body {
  deliveryOrderId: string
  carIds: string[]
  containerIds: string[]
  goodsIds: string[]
}

const body = ref<Body>({
  deliveryOrderId: '',
  carIds: [],
  containerIds: [],
  goodsIds: [],

})

const filters = ref({
  customerId: null,
  hasDeliveryOrder: 'false',
  customerName: null,
  policaNumber: null,
  containerNumber: null,
  containerSize: null,
  containerWeightFrom: null,
  containerWeightTo: null,
  containerType: null,
  containerState: null,
  fillStatus: null,
  containerLine: null,
  carWeightFrom: null,
  carWeightTo: null,
  carBillLading: null,
  carType: null,
  carBrand: null,
  goodsTypeId: null,
  carModel: null,
  carColor: null,
  carYear: null,
})

const deliveryOrder = computed({
  get: () => deliveryOrderStore.deliveryOrder,
  set: value => deliveryOrderStore.setDeliveryOrder(value),
})

const exludeKeys = ['customer', 'terminal', 'rfid', 'port', 'containerInfo.rfid', 'containerInfo.type', 'product', 'actions']
const pageTotal = ref(0)
const currentPage = ref(1)

const headers = computed(() => {
  let headers: any[] = []
  if (selectedTab.value === Tabs.Cars)
    headers = CarHeaders

  else if (selectedTab.value === Tabs.Containers)
    headers = ContainerHeaders

  else if (selectedTab.value === Tabs.Goods)
    headers = GoodsHeaders

  const modified = headers.filter(header => !exludeKeys.includes(header.key))

  modified.unshift({
    key: 'select',
    label: 'اختيار',
  })

  return modified
})

const goodsData = computed(() => {
  if (selectedTab.value === Tabs.Cars) {
    pageTotal.value = data.value.cars.count

    return data.value.cars.data
  }
  else if (selectedTab.value === Tabs.Containers) {
    pageTotal.value = data.value.containers.count

    return data.value.containers.data
  }
  else if (selectedTab.value === Tabs.Goods) {
    pageTotal.value = data.value.goods.count

    return data.value.goods.data
  }

  return []
})

const itemsCount = ref(0)

const fetchData = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('/TripPortTerminal/manifests/items', {
      params: {
        tripPortTerminalId: deliveryOrderStore.deliveryOrder.tripPortTerminalId,
        take: 10,
        skip: currentPage.value - 1,

        // hasDeliveryOrder: isFirst,
        ...filters.value,
      },
    })

    data.value = res.data.result
    if (data.value.containers.data.length > 0)
      selectedTab.value = Tabs.Containers

    else if (data.value.cars.data.length > 0)
      selectedTab.value = Tabs.Cars

    else if (data.value.goods.data.length > 0)
      selectedTab.value = Tabs.Goods
    else
      selectedTab.value = Tabs.Containers

    // selectedTab.value = showTabs.value[0]
    itemsCount.value = data.value.containers.count + data.value.cars.count + data.value.goods.count
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const isAllGoodsSelected = computed(() => {
  let selected = true
  goodsData.value.forEach(item => {
    if (selectedTab.value === Tabs.Cars) {
      if (!body.value.carIds.includes(item.id))
        selected = false
    }
    else if (selectedTab.value === Tabs.Containers) {
      if (!body.value.containerIds.includes(item.id))
        selected = false
    }
    else if (selectedTab.value === Tabs.Goods) {
      if (!body.value.goodsIds.includes(item.id))
        selected = false
    }
  })

  return selected
})

const toggleAllGoodsSelection = () => {
  if (isAllGoodsSelected.value) {
    body.value.carIds = []
    body.value.containerIds = []
    body.value.goodsIds = []
  }
  else {
    goodsData.value.forEach(item => {
      if (selectedTab.value === Tabs.Cars)
        body.value.carIds.push(item.id)

      else if (selectedTab.value === Tabs.Containers)
        body.value.containerIds.push(item.id)

      else if (selectedTab.value === Tabs.Goods)
        body.value.goodsIds.push(item.id)
    })
  }
}

const isGoodSelected = (goodId: string) => {
  if (selectedTab.value === Tabs.Cars)
    return body.value.carIds.includes(goodId)

  else if (selectedTab.value === Tabs.Containers)
    return body.value.containerIds.includes(goodId)

  else if (selectedTab.value === Tabs.Goods)
    return body.value.goodsIds.includes(goodId)

  return false
}

const selectGood = (goodId: string) => {
  if (selectedTab.value === Tabs.Cars) {
    if (body.value.carIds.includes(goodId))
      body.value.carIds = body.value.carIds.filter(item => item !== goodId)

    else
      body.value.carIds.push(goodId)
  }
  else if (selectedTab.value === Tabs.Containers) {
    if (body.value.containerIds.includes(goodId))
      body.value.containerIds = body.value.containerIds.filter(item => item !== goodId)

    else
      body.value.containerIds.push(goodId)
  }
  else if (selectedTab.value === Tabs.Goods) {
    if (body.value.goodsIds.includes(goodId))
      body.value.goodsIds = body.value.goodsIds.filter(item => item !== goodId)

    else
      body.value.goodsIds.push(goodId)
  }
}

const postData = async () => {
  try {
    isLoading.value = true

    await axios.put(`/DeliveryOrderItem/${id.value}`, body.value)
    console.log('done')

    router.push(`/delivery-order-item/${id.value}`)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const getDeliveryOrder = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrder/${id.value}`)

    deliveryOrder.value = data.result

    deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (isNullOrUndefined(deliveryOrder.value))
    getDeliveryOrder()
  else
    fetchData()

  // else {
  //   body.value.deliveryOrderId = deliveryOrder.value.id
  //   fetchData(true)
  // }
})

const showTabs = computed<Tabs[]>(() => {
  const tabs: Tabs[] = []
  if (data.value.containers.data.length > 0)
    tabs.push(Tabs.Containers)

  if (data.value.cars.data.length > 0)
    tabs.push(Tabs.Cars)

  if (data.value.goods.data.length > 0)
    tabs.push(Tabs.Goods)

  return tabs
})

watch(currentPage, () => {
  fetchData()
})
watch(() => filters.value, (newVal, oldVal) => {
  console.log(newVal, oldVal)

  currentPage.value = 1
  fetchData()
}, {
  debounce: 500,
  deep: true,
})

const filtersChanged = val => {
  filters.value = val
}

const tableStore = useTableStore()

tableStore.setTitle('اضافة بيانات لأمر التسليم')

const isAnyGoodsSelected = computed(() => {
  return body.value.carIds.length > 0 || body.value.containerIds.length > 0 || body.value.goodsIds.length > 0
})
</script>

<template>
  <h3 v-if="route.query.noData">
    يجب عليك اضافة محتويات امر التسليم لأكمال العملية
  </h3>
  <VCard
    class="transparent"
    flat
    :loading="isLoading"
  >
    <VCardTitle class="d-flex bg-white pa-5 rounded-pill align-center my-3 gap-3">
      <!--
        <span class="text-h4">
        اضافة
        <span class="font-weight-bold">
        حاويات، سيارات، بضائع
        </span>
        </span>
      -->
      <div class="radio-group d-flex align-center gap-2">
        <div
          class="d-flex align-center"
          @click="filters.hasDeliveryOrder = 'true'"
        >
          <input
            v-model="filters.hasDeliveryOrder"
            value="true"
            type="radio"
          >
          <VLabel class="mx-1">
            مضمن بأمر التسليم
          </VLabel>
        </div>
        <div
          class="d-flex align-center"
          @click="filters.hasDeliveryOrder = 'false'"
        >
          <input
            v-model="filters.hasDeliveryOrder"
            value="false"
            type="radio"
          >
          <VLabel class="mx-1">
            غير مضمن بأمر التسليم
          </VLabel>
        </div>
      </div>

      <VSpacer />
      <VBtn
        variant="text"
        color="primary"
        :disabled="isLoading"
        @click="fetchData"
      >
        <VIcon size="30">
          mdi-refresh
        </VIcon>
      </VBtn>
      <VBtn
        variant="outlined"
        color="error"
        :disabled="isLoading"
        @click="router.back()"
      >
        <VIcon size="20">
          mdi-arrow-right
        </VIcon>
        رجوع
      </VBtn>
      <VBtn
        variant="tonal"
        color="primary"
        :disabled="isLoading || !isAnyGoodsSelected"
        @click="postData"
      >
        <VIcon size="20">
          mdi-plus
        </VIcon>
        اضافة المحتويات لأمر التسليم
      </VBtn>
    </VCardTitle>

    <VCardText
      v-if="deliveryOrder"
      class="mx-0 px-0"
    >
      <DeliveryOrderTabs
        v-model="selectedTab"
        class-name="my-8"
      />
      <ItemsTable
        class="mt-5"
        has-filter
        :tab="selectedTab"
        :data="goodsData"
        :loading="isLoading"
        :exlude-keys="exludeKeys"
        :customer-id="deliveryOrder.customer.id"
        @filters="filtersChanged"
      >
        <template #before-filters>
          تم تحديد
          <VChip
            color="success"
            class="mx-2"
          >
            {{ body.carIds.length + body.containerIds.length + body.goodsIds.length }}
          </VChip>
          من اصل <VChip
            color="info"
            class="mx-2"
          >
            {{ itemsCount }}
          </VChip>
        </template>
        <template #header-select>
          #
          <VIcon
            v-if="deliveryOrder.status === 0"
            size="20"
            class="text-center"

            color="primary"
            @click="toggleAllGoodsSelection"
          >
            {{ isAllGoodsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
          </VIcon>
          <!--
            <input
            type="checkbox"
            :checked="isAllGoodsSelected"
            @click="toggleAllGoodsSelection"
            >
          -->
        </template>
        <template #select="{ item, index }">
          <div class="d-flex">
            <VIcon
              v-if="deliveryOrder.status === 0"
              size="20"
              class="text-center mx-1"
              color="primary"

              @click="selectGood(item.id)"
            >
              {{ isGoodSelected(item.id) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </VIcon>
            <p>{{ index + 1 }}</p>
          </div>
        </template>
      </ItemsTable>
      <!-- {{ body }} -->
      <div class="d-flex justify-end">
        <VPagination
          v-model="currentPage"
          :length="(pageTotal / 10) + (pageTotal % 10 !== 0 ? 1 : 0)"
          :total-visible="5"
          :disabled="isLoading"
          @input="fetchData(false)"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.custom-checkbox {
  .v-input--selection-controls__ripple {
    border-radius: 50%;
  }

  input {
    background-color: white !important;
  }
}
</style>
