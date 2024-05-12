<script setup lang="ts">
import { FieldType } from '@/components/app-form/types'

import { requiredValidator } from '@/@core/utils/validators'
import Active from '@/components/Active.vue'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'

const urls: ApiUrls = {
  get: '/address',
  delete: '/address',
  create: '/address',
  update: '/address',
}

const tableFields: TableField[] = [
  {
    key: 'name',
    label: 'الاسم',
    filterable: false,
    create: false,
  },

  {
    key: 'nameAr',
    label: 'الاسم بالعربي',
    hideInTable: true,
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 4,
      type: FieldType.Text,
    },
  },
  {
    key: 'nameEn',
    label: 'الاسم بالانجليزي',
    hideInTable: true,
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 4,
      type: FieldType.Text,
    },
  },
  {
    key: 'nameKr',
    label: 'الاسم بالكردي',
    hideInTable: true,
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 4,
      type: FieldType.Text,
    },
  },
  {
    key: 'governorateId',
    label: 'المحافظة',
    hideInTable: true,
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 12,
      type: FieldType.Select,
      options: {
        getURL: '/Governorate',
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
      cols: 12,
      type: FieldType.Textarea,
    },
  },
  {
    key: 'isActive',
    label: 'مفعل',
    create: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Select,
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
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="العنواين"
    :urls="urls"
    add-btn-text="اضافة عنوان"
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
