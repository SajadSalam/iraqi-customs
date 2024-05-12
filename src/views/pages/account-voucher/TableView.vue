<script lang="ts" setup>
import moment from 'moment'
import type { VoucherType } from './types'
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import { useUserStore } from '@/stores/UserStore'
import { useVoucherStore } from '@/stores/VoucherStore'
import VoucherDialog from '@/views/pages/account-voucher/VoucherDialog.vue'

const props = defineProps<Props>()
const userStore = useUserStore()
interface Props {
  title: string
  type: VoucherType
}
const title = toRef(props, 'title')
const type = toRef(props, 'type')

const tableStore = useTableStore()
const VoucherStore = useVoucherStore()

const urls = ref<ApiUrls>({
  get: `/AccountVoucher?type=${type.value}`,
  delete: '/AccountVoucher',
  create: '/AccountVoucher',
  update: '/AccountVoucher',
})

const tableFields: TableField[] = [
  {
    key: 'number',
    label: 'رقم الصادر',
  },
  {
    key: 'date',
    label: 'التاريخ ',
  },
  {
    key: 'amount',
    label: 'المبلغ',
  },
  {
    key: 'fromAccount',
    label: 'من حساب',
  },
  {
    key: 'toAccount',
    label: 'الى حساب',
  },
  {
    key: 'description',
    label: 'الوصف',
  },

  // filters
  {
    key: 'fromDate',
    label: 'من تاريخ',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'toDate',
    label: 'الى تاريخ',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'fromAccountId',
    label: 'من حساب',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Accounts',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'toAccountId',
    label: 'الى حساب',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Accounts',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'fromAmount',
    label: 'من مبلغ',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: 'toAmount',
    label: 'الى مبلغ',
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Number,
    },
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    :view-type="ViewType.Table"
    hide-view-type
    pagination
    :title="title"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
    hide-edit
    disable-crud
  >
    <template #headerActions>
      <VBtn
        v-if="userStore.havePermission('AccountVouchers-NewAccountVoucher')"
        color="primary"
        @click="VoucherStore.setVoucherOnlyDialog(true)"
      >
        <VIcon class="ml-2">
          mdi-plus
        </VIcon>
        إضافة
      </VBtn>
    </template>
    <template #actions="{ item }">
      <VBtn
        color="primary"
        icon
        variant="text"
        @click="VoucherStore.openEdit(item.id)"
      >
        <VIcon>tabler-edit</VIcon>
      </VBtn>
    </template>
    <template #date="{ item }">
      {{ moment(item.date).format("YYYY-MM-DD") }}
    </template>
  </AppTable>
  <VoucherDialog
    :type="type"
    :title="title"
    @refresh="tableStore.setRefresh(true)"
  />
</template>
