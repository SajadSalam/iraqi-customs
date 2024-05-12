<script lang="ts" setup>
import moment from 'moment'
import { type TableField, ViewType } from '@/components/app-table/types'
import { PayStatusEnum, payTypes } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import Pay from '@/views/pages/trips/pay.vue'
import ReceiptDialog from '@/views/pages/trips/receiptDialog.vue'
import axios from '@axios'

const tripStore = useTripStore()
const tableStore = useTableStore()

const route = useRoute()
const id = computed(() => route.params.id)
const trip = computed(() => tripStore.trip)
const isLoading = ref(false)

const urls: ApiUrls = {
  get: `/BillFreely?tripId=${id.value}`,
  delete: '/BillFreely',
  create: '/BillFreely',
  update: '/BillFreely',
}

const fetchTrip = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/trip/${id.value}`)

    tripStore.setTrip(data.result)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTrip()
})

const fields: TableField[] = [
  {
    label: 'التاريخ',
    key: 'date',
  },
  {
    label: 'الضريبة',
    key: 'totalTax',
  },
  {
    label: 'الضريبة المدفوعة',
    key: 'totalTaxPaid',
  },
  {
    label: 'الخصم',
    key: 'discount',
  },
  {
    label: 'نوع الدفع',
    key: 'payType',
  },
  {
    label: 'الحالة',
    key: 'status',
  },
]

const openReceipt = (item: any) => {
  tripStore.setTrip(item)
  tripStore.setReceiptDialog(true)
}

const openPay = (item: any) => {
  tripStore.setBill(item)
  tripStore.setPayDialog(true)
}
</script>

<template>
  <div v-if="!isLoading">
    <VRow class="bg-white mx-2 rounded pa-5">
      <VCol
        cols="12"
        md="3"
      >
        <VCard
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-ship-wheel
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  رقم الرحلة
                </p>
                <p class="ma-0 text-h3">
                  {{ trip.tripNumber }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="5"
      >
        <VCard
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-calendar
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  تاريخ الوصول
                </p>
                <p class="ma-0 text-h3">
                  {{ moment(trip.arrivalDate).format('YYYY-MM-DD HH:ss A') }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          v-if="trip.financialYear"
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-cash-multiple
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  السنة المالية
                </p>
                <p class="ma-0 text-h3">
                  {{ trip.financialYear.number }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
    </VRow>
    <AppTable
      class="mt-5"
      :urls="urls"
      disable-crud
      hide-edit
      hide-delete
      hide-view-type
      :fields="fields"
      :view-type="ViewType.Table"
      title="الخلاصة البحرية"
      pagination
      have-actions
    >
      <template #headerActions>
        <VBtn
          color="warning"
          @click="openReceipt(trip)"
        >
          <VIcon>mdi-swap-horizontal</VIcon>
          اعادة احتساب
        </VBtn>
      </template>
      <template #date="{ item }">
        <span dir="ltr">
          {{ moment(item.date).format('YYYY-MM-DD HH:mm:ss A') }}
        </span>
      </template>
      <template #actions="{ item }">
        <VBtn
          color="primary"
          @click="openPay(item)"
        >
          <VIcon>mdi-currency-usd</VIcon>
          دفع
        </VBtn>
      </template>
      <template #payType="{ item }">
        <VChip
          size="large"
          color="primary"
        >
          {{ payTypes.find(x => x.value === item.payType)?.arName }}
        </VChip>
      </template>
      <template #status="{ item }">
        <VChip
          :color="PayStatusEnum.find((x) => x.value === item.payType)?.color"
          text-color="primary"
          size="large"
        >
          {{
            PayStatusEnum.find((x) => x.value === item.payType)?.arName
          }}
        </VChip>
      </template>
    </AppTable>
    <ReceiptDialog />
    <Pay />
  </div>
</template>
