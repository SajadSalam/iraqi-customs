<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'

import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { AccountUserTypeEnum } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import { useAccountsStore } from '@/stores/AccountsStore'
import { useTableStore } from '@/stores/AppTableStore'
import { useUserStore } from '@/stores/UserStore'
import AddAccountsDialog from '@/views/pages/accounts/AddAccountsDialog.vue'

const userStore = useUserStore()
const AccountsStore = useAccountsStore()
const tableStore = useTableStore()

const urls: ApiUrls = {
  get: '/Accounts',
  delete: '/Accounts',
  create: '/Accounts',
  update: '/Accounts',
}

const tableFields: TableField[] = [
  {
    key: 'number',
    label: 'الرقم',
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'name',
    label: 'الاسم',
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'accountingType',
    label: 'نوع الحسابات',
    filterable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      validations: [requiredValidator],
      options: {
        items: [
          { name: 'General', id: 0 },
          { name: 'Detail', id: 1 },
        ],
      },
    },
  },
  {
    key: 'orderType',
    label: 'نوع العملية',
    filterable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      validations: [requiredValidator],
      options: {
        items: [
          {
            name: 'None',
            id: 0,
          },
          {
            name: 'DeliveryOrder',
            id: 1,
          },
          {
            name: 'BillFreely',
            id: 2,
          },
          {
            name: 'AccountVoucher',
            id: 3,
          },
        ],
      },
    },
  },
  {
    key: 'userType',
    label: 'نوع المستخدم',
    filterable: true,
    create: false,
    field: {
      cols: 6,
      type: FieldType.Select,
    },
  },
  {
    key: 'credit',
    label: 'الدائن',
    create: true,
    field: {
      defualtValue: '0',
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'debit',
    label: 'مدين',
    create: true,
    field: {
      defualtValue: '0',
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'debit',
    label: 'الرصيد',
    create: false,
    hideInEdit: true,
  },
  {
    key: 'parentId',
    label: 'الحساب الاب',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      validations: [requiredValidator],
      options: {
        getURL: '/Accounts',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },

  {
    key: 'description',
    label: 'الوصف',
    create: true,
    field: {
      cols: 6,
      type: FieldType.Textarea,
    },
  },
  {
    key: 'showInTree',
    label: 'اظهار في شجرة الحسابات',
    filterable: true,
    hideInTable: true,

    create: true,
    field: {
      defualtValue: true,
      cols: 6,
      type: FieldType.Radio,
      options: {
        items: [
          { name: 'نعم', id: true },
          { name: 'لا', id: false },
        ],
      },
    },
  },
  {
    key: 'isPayment',
    label: 'مدفوع',
    filterable: true,
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Radio,
      defualtValue: true,
      options: {
        items: [
          { name: 'نعم', id: true },
          { name: 'لا', id: false },
        ],
      },
    },
  },
]

const openAccountDialog = () => {
  AccountsStore.setAccountsDialog(true)
}
</script>

<template>
  <AppTable
    :fields="tableFields"
    :view-type="ViewType.Table"
    hide-view-type
    pagination
    title="الحسابات"
    :urls="urls"
    add-btn-text=""
    have-actions
    hide-edit
    disable-crud
  >
    <template #headerActions>
      <VBtn
        v-if="userStore.havePermission('Accounts-Create')"
        color="primary"
        @click="openAccountDialog"
        variant="tonal"
      >
        <VIcon>mdi-plus</VIcon>
        اضافة حساب
      </VBtn>
    </template>
    <template #actions="{ item }">
      <VBtn
        v-if="userStore.havePermission('Accounts-UpdateAccount')"
        color="primary"
        icon
        variant="text"
        @click="AccountsStore.openEdit(item)"
      >
        <VIcon>tabler-edit</VIcon>
      </VBtn>
    </template>
    <template #accountingType="{ item }">
      <VChip
        color="primary"
        text-color="white"
        class="mr-2"
      >
        {{ item.accountingType === 0 ? "General" : "Detail" }}
      </VChip>
    </template>
    <template #orderType="{ item }">
      <VChip
        color="primary"
        text-color="white"
        class="mr-2"
      >
        {{
          item.orderType === 0
            ? "None"
            : item.orderType === 1
              ? "DeliveryOrder"
              : item.orderType === 2
                ? "BillFreely"
                : item.orderType === 3
                  ? "AccountVoucher"
                  : "---"
        }}
      </VChip>
    </template>
    <template #userType="{ item }">
      <VChip
        color="primary"
        text-color="white"
        class="mr-2"
      >
        {{ AccountUserTypeEnum.find((x) => x.value === item.userType)?.arName }}
      </VChip>
    </template>
  </AppTable>
  <AddAccountsDialog @refresh="tableStore.setRefresh(true)" />
</template>
