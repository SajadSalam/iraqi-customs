<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'

import Active from '@/components/Active.vue'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'

const urls: ApiUrls = {
  get: '/CustomerNames',
  delete: '/CustomerNames',
  create: '/CustomerNames',
  update: '/CustomerNames',
}

const tableFields: TableField[] = [
  {
    key: 'name',
    label: 'الاسم الشائع',
    filterable: false,
    create: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'customer.fullname',
    label: 'المستفيد',
    create: false,
    icon: 'mdi-account',
  },
  {
    key: 'customerId',
    label: 'المستفيد',
    create: true,
    hideInTable: true,
    field: {
      validations: [requiredValidator],
      cols: 12,
      type: FieldType.Select,
      options: {
        getURL: '/Customers',
        itemLabel: 'fullname',
        itemValue: 'id',
      },
    },
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="الاسماء الشائعة"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #isActive="{ item }">
      <Active
        v-model="item.isActive"
        :update-url="`${urls.update}/${item.id}`"
      />
    </template>
  </AppTable>
</template>

<style lang="" scoped>

</style>
