<script setup lang="ts">
import moment from 'moment'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { VIcon } from 'vuetify/lib/components/index.mjs'
import BulkOperations from '../../views/pages/delivery-order-item/BulkOperations.vue'
import CreateCustomClearance from '@/views/custom-clearnace/CreateCustomClearance.vue'

import { useTableStore } from '@/stores/AppTableStore'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import DeleteItem from '@/views/pages/delivery-order-item/DeleteItem.vue'
import DeliveryOrderTabs from '@/views/pages/delivery-order-item/DeliveryOrderTabs.vue'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'
import UpdateNote from '@/views/pages/delivery-order-item/UpdateNote.vue'
import { Tabs } from '@/views/pages/delivery-order-item/types'
import EditDescriptionDialog from '@/views/pages/delivery-order/EditDescriptionDialog.vue'
import InfoLabel from '@/views/pages/delivery-order/InfoLabel.vue'
import axios from '@axios'

const router = useRouter()
const deliveryOrderStore = useDeliveryOrderStore()
const route = useRoute()
const id = computed(() => route.params.id)
const deliveryOrder = ref(null)
const isCreateCerticateDialogOpen = ref(false)
const isLoading = ref(true)
const showDescriptionDialog = ref(false)
const descriptionEditedItem = ref<any>(null)
const showOnlyDescription = ref(false)
const total = ref(0)
const currentPage = ref(1)

const selectedTab = computed<Tabs>({
  get() {
    return deliveryOrderStore.tab
  },
  set(value) {
    deliveryOrderStore.tab = value
  },
})

const getDeliveryOrder = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrder/${id.value}`)

    deliveryOrder.value = data.result
    if (deliveryOrder.value.status === 0 && !deliveryOrder.value.hasItems)
      router.push(`/delivery-order-item/items/${id.value}?noData=true`)

    deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
    deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

interface Data {
  id: string
  cars: any[]
  containers: any[]
  goods: any[]
  isDeleted: boolean
}

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

const data = ref<Data>({
  id: '',
  cars: [],
  containers: [],
  goods: [],
  isDeleted: false,
})

const body = ref<any>({
  isWaiver: true,
  carIds: [],
  containerIds: [],
  goodsIds: [],

})

const fetchingData = ref(false)

const fetchData = async () => {
  fetchingData.value = true
  try {
    const res = await axios.get(`/deliveryOrderItem/${id.value}`, {
      params: {
        ...filters.value,
      },

    })

    data.value = res.data.result.data[0] as Data
    if (data.value.containers.length > 0)
      selectedTab.value = Tabs.Containers
    else if (data.value.cars.length > 0)
      selectedTab.value = Tabs.Cars
    else if (data.value.goods.length > 0)
      selectedTab.value = Tabs.Goods

    // if all empty
    // if (data.value.containers.length === 0 && data.value.cars.length === 0 && data.value.goods.length === 0 && deliveryOrder.value.status === 0)
    //   router.push(`/delivery-order-item/items/${id.value}?noData=true`)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    fetchingData.value = false
  }
}

const showTabs = computed<Tabs[]>(() => {
  const tabs: Tabs[] = []
  if (data.value.containers.length > 0)
    tabs.push(Tabs.Containers)

  if (data.value.cars.length > 0)
    tabs.push(Tabs.Cars)

  if (data.value.goods.length > 0)
    tabs.push(Tabs.Goods)

  selectedTab.value = tabs[0]

  return tabs
})

// const isEmpty = computed(() => {
//   return (
//     !data.value.cars.length
//     && !data.value.containers.length
//     && !data.value.goods.length
//   )
// })

const openContainer = (item: any) => {
  if (item.fillStatus === 1) {
    toast.error('لا يمكن تفريغ حاوية فارغة')

    return
  }
  deliveryOrderStore.setContainer(item)
  deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)

  // deliveryOrderStore.setOpenContainerDialog(true)
  router.push({
    name: 'delivery-order-item-open-id',
    params: { id: id.value },
    query: {
      containerId: item.id,
    },
  })
}

const deleteItem = (item: string) => {
  deliveryOrderStore.setDeletDialog(true, selectedTab.value)
  deliveryOrderStore.setIDGoods(id.value.toString(), item.id.toString())
  console.log(selectedTab.value, id.value, item.id, 'storeData')
}

onMounted(() => {
  getDeliveryOrder()
  fetchData()
})
watch(
  () => deliveryOrderStore.isDialogDelete,
  val => {
    if (!val)
      fetchData()
  },
)

const goodsData = computed(() => {
  return selectedTab.value === Tabs.Containers
    ? data.value.containers
    : selectedTab.value === Tabs.Cars
      ? data.value.cars
      : data.value.goods
})

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
  if (body.value.carIds.length === 0 && body.value.containerIds.length === 0 && body.value.goodsIds.length === 0) {
    toast.error('يجب اختيار عنصر واحد على الأقل')
  }
  else {
    try {
      isLoading.value = true

      const res = await axios.patch(`/DeliveryOrderItem/${id.value}/waiver`, body.value)

      toast.success(res.data.message)
      fetchData()
    }
    catch (error) {
      console.log(error)
    }
    finally {
      isLoading.value = false
    }
  }
}

const isAnySelected = computed(() => {
  return body.value.carIds.length > 0 || body.value.containerIds.length > 0 || body.value.goodsIds.length > 0
})

const selectedCount = computed(() => {
  return body.value.carIds.length + body.value.containerIds.length + body.value.goodsIds.length
})

function editDescription(item, onlyDescription = false) {
  descriptionEditedItem.value = item
  showDescriptionDialog.value = true
  showOnlyDescription.value = onlyDescription
}
function editNote() {
  deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
  deliveryOrderStore.setIsUpdateNoteDialogOpen(true)
}

const tableStore = useTableStore()

tableStore.setTitle('معلومات امر التسليم')

const handleUpdateFilters = (newFilters: any) => {
  // update only changed filters
  for (const key in newFilters) {
    if (newFilters[key] !== filters.value[key])
      filters.value[key] = newFilters[key]
  }
}

watch(
  () => filters.value,
  () => {
    fetchData()
  },
  { deep: true },
)

const openPreviewInvoice = () => {
  deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
  deliveryOrderStore.setPreivewInvoice(true)
}

const printInvoice = () => {
  window.open(`/print/delivery-order-invoice/${deliveryOrder.value.id}`)
}

const printOrder = (type: 1 | 2) => {
  window.open(`/delivery-order/pdf/${id.value}?type=${type}`)
}

const openPay = () => {
  deliveryOrderStore.setPayDeliveryDialog(true)

  deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
}

const exludedKeys = computed(() => {
  const keys = [
    'product',
    'portSection.name',
    'departmentGarage.name',
  ]

  if (deliveryOrder.value?.status !== 0) {
    keys.push('actions')
    keys.push('operations')
  }

  return keys
})

const openCancelDialog = () => {
  deliveryOrderStore.setCancelId(id.value)
  deliveryOrderStore.setCancelDialog(true)
}

const openDropDialog = () => {
  deliveryOrderStore.setDropId(id.value)
  deliveryOrderStore.setDropDialog(true)
}
</script>

<template>
  <div v-if="deliveryOrder !== null">
    <h2 class="font-weight-boldd flex-grow-1 text-h5 mb-5">
      معلومات امر التسليم
    </h2>
    <VCard
      v-if="deliveryOrder !== null"
      class="pa-3"
      flat
    >
      <VCardText class="pa-0">
        <VRow justify="space-between">
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="تاريخ التسليم"
              :value="moment(deliveryOrder?.deliveryDate).format('YYYY-MM-DD')"
              icon="mdi-calendar"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="رقم امر التسليم"
              :value="deliveryOrder?.number"
              icon="mdi-numeric"
            />
          </VCol>

          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="المدير المفوض"
              :value="deliveryOrder?.customer.fullname"
              icon="mdi-account"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="المكتب"
              :value="deliveryOrder?.office || 'لا يوجد'"
              icon="mdi-badge-account"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="الوكيل"
              :value="deliveryOrder?.agent?.fullname || 'لا يوجد'"
              icon="mdi-badge-account"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class=" border-b"
          >
            <InfoLabel
              label="الحالة"
              :value="
                DeliveryOrderStatusEnum.find(
                  (v) => v.value === deliveryOrder.status,
                )?.arName
              "
              icon="mdi-badge"
            />
          </VCol>

          <VCol
            cols="12"
            md="2"
            class="border-e border-b"

            to="/test"
          >
            <InfoLabel
              :to="`/trips-port/${deliveryOrder?.trip.id}`"
              label="الرحلة"
              :value="deliveryOrder?.trip.tripNumber"
              icon="tabler-speedboat"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="الميناء"
              :value="deliveryOrder?.port.name"
              icon="mdi-ship-wheel"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="الرصيف"
              :value="deliveryOrder?.terminal.name"
              icon="tabler-barrier-block"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="المدير المفوض"
              :value="deliveryOrder?.customer.fullname"
              icon="tabler-users"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class="border-e border-b"
          >
            <InfoLabel
              label="تصحيح اسم"
              :value="deliveryOrder?.isCorrectName ? 'نعم' : 'لا'"
              icon="tabler-users"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
            class=" border-b"
          >
            <InfoLabel
              label="تم التنازل"
              :value="
                deliveryOrder?.customerAssignee
                  ? deliveryOrder.customerAssignee.fullname
                  : 'لم يتم التنازل'
              "
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class=" border-b"
          >
            <InfoLabel
              label="تم الانشاء بواسطة"
              :value="
                deliveryOrder.creationBy.fullName
              "
            />
          </VCol>
          <VCol cols="12">
            <InfoLabel
              label="الملاحظات"
              :value="deliveryOrder?.note"
              icon="tabler-barrier-block"
            />
            <VSpacer />
            <!-- v-if="deliveryOrder.status === 0" -->
            <VBtn
              color="warning"
              class="mt-2"
              @click="editNote"
            >
              <VIcon class="ml-1">
                mdi-file-sign
              </VIcon>
              تعديل الملاحظات
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <VCard
      flat
      class="my-3"
    >
      <VCardTitle class="d-flex align-center">
        <h3 class="flex-grow-1">
          بيانات امر التسليم
        </h3>

        <div class="d-flex justify-end py-1 gap-4">
          <!--
            <VBtn
            color="primary"
            :disabled="!isAnySelected"
            @click="postData"
            >
            <VIcon class="ml-1">
            mdi-file-sign
            </VIcon>
            تنازل
            </VBtn>
          -->
          <VBtn
            color="error"
            variant="outlined"
            @click.stop="openCancelDialog"
          >
            اتلاف الامر
          </VBtn>
          <VBtn
            color="primary"
            @click.stop="isCreateCerticateDialogOpen = true"
          >
            <VIcon>
              mdi-file-document-edit
            </VIcon>
            طلب تصريحة كمركية
          </VBtn>
          <VBtn
            v-if="deliveryOrder.status === 0"
            color="primary"
            :to="`/delivery-order-item/items/${id}`"
            variant="elevated"
          >
            <VIcon>mdi-plus</VIcon>
            إضافة بيانات
          </VBtn>
        </div>
      </VCardTitle>
    </VCard>
    <VCard
      v-if="!isLoading "
      class="mt-3"
      :loading="fetchingData"
    >
      <VCardTitle class="main-tabs">
        <DeliveryOrderTabs v-model="selectedTab" />
      </VCardTitle>

      <VCardText>
        <BulkOperations
          :containers-ids="body.containerIds"
          :cards-ids="body.carIds"
          :goods-ids="body.goodsIds"
          @refresh="() => {
            body.containerIds = []
            body.carIds = []
            body.goodsIds = []
            fetchData()
          }"
        />
        <ItemsTable
          :tab="selectedTab"
          :loading="fetchingData"
          :data="goodsData"
          :exlude-keys="exludedKeys"
          @filters="handleUpdateFilters"
        >
          <template #header-select>
            <div class="d-flex align-center justify-space-between text-center">
              <VIcon
                v-if="deliveryOrder.status === 0"
                size="20"
                class="text-center"

                color="primary"
                @click="toggleAllGoodsSelection"
              >
                {{ isAllGoodsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
              </VIcon>
              <p class="mt-4 text-h6 text-white">
                #
              </p>
            </div>
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

          <template #actions="{ item }">
            <div class="d-flex">
              <VBtn
                v-if="deliveryOrder.status === 0"
                variant="text"
                size="small"
                class=""
                color="primary"
                @click="editDescription(item, false)"
              >
                <VIcon size="20">
                  mdi-file-document-edit
                </VIcon>
                تعديل الوصف
              </VBtn>

              <VBtn
                v-if="deliveryOrder.status === 0"
                size="x-small"
                icon
                color="error"
                @click="deleteItem(item)"
              >
                <VIcon size="20">
                  mdi-delete
                </VIcon>
              </VBtn>
            </div>
          </template>
          <div class="d-flex justify-end">
            <VPagination
              v-model="currentPage"
              :length="(total / 10) + 1"
              :total-visible="5"
              :disabled="isLoading"
              @change="getManifestData"
            />
          </div>
        </ItemsTable>
      </VCardText>
    </VCard>
    <!--
      <VCard
      v-if="!isLoading "
      flat
      class="transparent"
      >
      <VCardText class="d-flex align-center flex-column justify-center text-center">
      <h3 class="flex-grow-1">
      لا يوجد بيانات
      <br>
      <small class="text-hint">قم بإضافة بيانات لعرضها هنا</small>
      </h3>

      <img
      src="/ship.svg"
      height="400"
      >
      </VCardText>
      </VCard>
    -->
    <div
      v-if="isLoading"
      class="d-flex align-center justify-center"
    >
      <VProgressCircular
        v-if="isLoading"
        size="100"
        class="my-10"
        indeterminate
        color="primary"
      />
    </div>  <CreateCustomClearance
      v-model:model-value="isCreateCerticateDialogOpen"
      :delivery-order-id="deliveryOrder.id"
      :customer-id="deliveryOrder.commissionerDirector"
    />
  </div>

  <DeleteItem />
  <EditDescriptionDialog
    v-model="showDescriptionDialog"
    :item="descriptionEditedItem"
    :only-description="showOnlyDescription"
    :type="selectedTab"
    @update:refresh="fetchData"
  />
  <UpdateNote @refresh="getDeliveryOrder" />
</template>
