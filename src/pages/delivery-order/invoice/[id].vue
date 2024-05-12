<script lang="ts" setup>
import moment from 'moment'

import { toast } from 'vue3-toastify'
import { PayStatusEnum, PayTypeEnum } from '@/constants/enums'
import { useTableStore } from '@/stores/AppTableStore'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import AddInvoice from '@/views/pages/delivery-order/AddInvoice.vue'
import InfoLabel from '@/views/pages/delivery-order/InfoLabel.vue'
import Pay from '@/views/pages/delivery-order/Pay.vue'
import axios from '@axios'

const deliveryOrderStore = useDeliveryOrderStore()
const tableStore = useTableStore()
const route = useRoute()
const id = computed(() => route.params.id)
const deliveryOrder = ref(null)
const isLoading = ref(true)
const invoices = ref<any[]>([])
const operations = ref<any[]>([])
const isOperationsOpen = ref(false)

const getDeliveryOrder = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrder/${id.value}`)

    deliveryOrder.value = data.result
    deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const openOperations = async item => {
  if (item.operations.length > 0) {
    operations.value = item.operations
    isOperationsOpen.value = true
  }
  else {
    toast.error('لا يوجد عمليات')
  }
}

const fetchData = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/deliveryOrder/${id.value}/invoice`)

    invoices.value = data.result
    if (invoices.value.length > 0)
      openOperations(invoices.value[0])
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getDeliveryOrder()
  fetchData()
})

const headers = [

  {
    key: 'listDate',
    label: 'تاريخ الفاتورة',
  },

  {
    key: 'totalPrice',
    label: 'السعر الكلي',
  },
  {
    key: 'raiyaPrice',
    label: 'نسبة الادارة الالكترونية',
  },
  {
    key: 'payType',
    label: 'طريقة الدفع',
  },
  {
    key: 'status',
    label: 'الحالة ',
  },
  {
    key: 'actions',
    label: 'الاجراءات',
  },
]

const openPay = (item: any) => {
  deliveryOrderStore.setPayDeliveryDialog(true)

  deliveryOrderStore.setPayData(item)
}

const confirmaionInvoice = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.put(`/deliveryOrder/invoice/${id.value}/confirmation`)

    toast.success(data.message)
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const printInvoice = async (type: number) => {
  // open new tab
  window.open(`/print/delivery-order-invoice/${id.value}?type=${type}`)
}
</script>

<template>
  <div v-if="!isLoading">
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
              label="المستفيد"
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
              :value="deliveryOrder?.commissionerDirector"
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
          فواتير الامر
        </h3>
        <div class="d-flex justify-end py-5 gap-3">
          <VBtn
            color="error"
            to="/delivery-order"
            variant="text"
          >
            <VIcon>mdi-arrow-left</VIcon>
            الرجوع
          </VBtn>
          <VMenu width="300">
            <template #activator="{ on, props }">
              <VBtn
                color="warning"
                v-bind="props"
                v-on="on"
              >
                <VIcon>mdi-printer</VIcon>
                طباعة
              </VBtn>
            </template>

            <VList>
              <VListItem @click="printInvoice(0)">
                <VListItemTitle class="text-lg">
                  طباعة فاتورة امر التسليم
                </VListItemTitle>
              </VListItem>
              <VListItem
                v-if="invoices.length > 1"
                @click="printInvoice(1)"
              >
                <VListItemTitle class="text-lg">
                  طباعة فاتورة التأكيد
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
          <VBtn
            v-if="invoices.length === 1"
            color="primary"
            variant="elevated"
            @click="confirmaionInvoice"
          >
            <VIcon>mdi-receipt-text-plus-outline</VIcon>
            اضافة فاتورة تأكيد
          </VBtn>
        </div>
      </VCardTitle>
    </VCard>
    <VRow>
      <VCol
        cols="12"
        :md="isOperationsOpen ? 9 : 12"
      >
        <StaticTable
          :headers="headers"
          :loading="isLoading"
          :data="invoices"
        >
          <template #listDate="{ item }">
            {{ moment(item.listDate).format('YYYY-MM-DD') }}
          </template>
          <template #payType="{ item }">
            <VChip
              :color="PayTypeEnum.find((x) => x.value === item.payType)?.color"
              text-color="white"
            >
              {{
                PayTypeEnum.find((x) => x.value === item.payType)?.arName
              }}
            </VChip>
          </template>
          <template #status="{ item }">
            <VChip
              :color="PayStatusEnum.find((x) => x.value === item.status)?.color"
              text-color="white"
            >
              {{
                PayStatusEnum.find((x) => x.value === item.status)?.arName
              }}
            </VChip>
          </template>
          <template #operations="{ item }">
            {{ item.operations.map(v => v.operationName).join(', ') }}
          </template>
          <template #actions="{ item }">
            <VBtn
              v-if="item.status !== 2"
              size="small"
              @click="openPay(item)"
            >
              <VIcon>mdi-currency-usd</VIcon>
              دفع
            </VBtn>
            <VBtn
              class="mx-1"
              size="small"
              color="warning"
              @click="openOperations(item)"
            >
              <VIcon>mdi-eye</VIcon>
              العمليات
            </VBtn>
          </template>
        </StaticTable>
      </VCol>
      <VCol
        v-if="isOperationsOpen"
        cols="12"
        md="3"
      >
        <VCard>
          <VCardTitle class="d-flex align-center bg-secondary pa-3">
            العمليات
            <VSpacer />
            <VBtn
              color="error"
              variant="text"
              size="small"
              @click="isOperationsOpen = false"
            >
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VCardTitle>
          <VCardText class="ma-0 pa-3">
            <div v-if="operations.length > 0">
              <div
                v-for="operation in operations"
                :key="operation.operationId"
              >
                <VChip
                  color="primary"
                  size="large"
                  variant="elevated"
                  text-color="white"
                  class="my-2"
                >
                  {{ operation.operationName }}
                </VChip>
                <p class="text-h6">
                  العدد :
                  <span class="font-weight-bold">
                    {{ operation.count }}
                  </span>
                </p>
                <p class="text-h6">
                  السعر المفرد:
                  <span class="font-weight-bold">
                    {{ operation.price.toLocaleString() }}
                  </span>
                </p>
                <p class="text-h6">
                  نسبة الادارة الالكترونية :
                  <span class="font-weight-bold">
                    {{ operation.raiyaPrice.toLocaleString() }}
                  </span>
                </p>
                <p class="text-h6">
                  <span class="font-weight-bold">

                    السعر الكلي : {{ (operation.totalPrice + operation.raiyaPrice).toLocaleString() }}
                  </span>
                </p>
                <VDivider />
              </div>
            </div>
            <div v-else>
              لا يوجد عمليات
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <AddInvoice @refresh="fetchData" />
  </div>
  <div
    v-else
    class="d-flex justify-center align-center"
  >
    <VProgressCircular
      indeterminate
      size="164"
      color="primary"
    />
  </div>
  <Pay @refresh="fetchData" />
</template>
