<script lang="ts" setup>
import moment from 'moment'
import { filter } from './filter'
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { payTypes } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import router from '@/router'
import { useTableStore } from '@/stores/AppTableStore'
import { useBillFreelyStore } from '@/stores/BillFreelyStore'
import { useTripStore } from '@/stores/TripsStore'
import { useUserStore } from '@/stores/UserStore'
import ShowBillDialog from '@/views/pages/bill-freely/ShowBillDialog.vue'
import Pay from '@/views/pages/trips/pay.vue'
import ReceiptDialog from '@/views/pages/trips/receiptDialog.vue'

const userStore = useUserStore()
const tableStore = useTableStore()
const tripStore = useTripStore()
const BillFreelyStore = useBillFreelyStore()

const urls: ApiUrls = {
  get: '/BillFreely',
  delete: '/BillFreely',
  create: '/BillFreely',
  update: '/BillFreely',
}

const tableFields: TableField[] = [
  {
    key: 'date',
    label: 'التاريخ',
  },
  {
    key: 'number',
    label: 'رقم الفاتورة',
    create: true,
    filterable: true,
    isMainFilter: true,
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'totalTax',
    label: 'مجموع الضريبة',
  },
  {
    key: 'totalTaxPaid',
    label: 'الضريبة المدفوعة',
  },

  {
    key: 'payType',
    label: 'نوع الدفع',
    create: false,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: payTypes,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  ...filter,
]

const openReceipt = (item: any) => {
  tripStore.setTrip(item)
  tripStore.setReceiptDialog(true)
}

const openPay = (item: any) => {
  tripStore.setBill(item)
  tripStore.setPayDialog(true)
}

const openDetiels = (item: any) => {
  router.push(`/bill-freely/details/${item.id}`)
  console.log(item, 'bill detils data')
}
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="الفاتورة البحرية"
    :urls="urls"
    hide-delete
    hide-edit
    disable-crud
    hide-view-type
    have-actions
    :view-type="ViewType.Table"
  >
    <template #actions="{ item }">
      <VBtn
        v-if="userStore.havePermission('BillFreely-GetBillFreelyById')"
        color="secondary"
        class="ml-2"
        @click="openDetiels(item)"
      >
        <VIcon>mdi-eye</VIcon>
        عرض التفاصيل
      </VBtn>

      <VBtn
        v-if="userStore.havePermission('BillFreely-UpdatePayBillFreely')"
        class="ml-2"
        @click="openPay(item)"
      >
        <VIcon>mdi-currency-usd</VIcon>
        دفع
      </VBtn>
      <VBtn
        v-if="userStore.havePermission('BillFreely-UpdateRecalculateBillFreely')"
        color="warning"
        @click="openReceipt(item)"
      >
        <VIcon>mdi-swap-horizontal</VIcon>
        اعادة احتساب
      </VBtn>
    </template>
    <template #date="{ item }">
      <p>{{ moment(item.date).format("YYYY-MM-DD HH:ss A") }}</p>
    </template>
    <template #payType="{ item }">
      <VChip color="primary">
        {{ payTypes.find((x) => x.value === item.payType)?.arName }}
      </VChip>
    </template>
  </AppTable>
  <ReceiptDialog @refresh="tableStore.setRefresh(true)" />
  <Pay @refresh="tableStore.setRefresh(true)" />
  <ShowBillDialog />
</template>
