<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useShipStore } from '@/stores/ShipsStore'
import AddUserShipDialog from '@/views/pages/ships/AddUserShipDialog.vue'

const shipStore = useShipStore()

const urls: ApiUrls = {
  get: '/Ship',
  delete: '/Ship',
  create: '/Ship',
  update: '/Ship',
}

const tableFields: TableField[] = [

  {
    key: 'name',
    label: 'اسم الباخرة',
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'text',
    label: 'الاسم',
    filterable: true,
    hideInTable: true,
    isMainFilter: true,
    field: {
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'weight',
    label: 'وزن الباخرة (GRT) ',
    icon: 'mdi-weight',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'length',
    label: ' طول الباخرة ',
    icon: 'mdi-ruler',
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'countryId',
    label: 'جنسية الباخرة',

    create: true,
    hideInTable: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/country',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'country',
    label: 'جنسية الباخرة',
    icon: 'mdi-flag',
    create: false,
    hideInEdit: true,
    field: {
      cols: 6,
      options: {
        getURL: '/country',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'shipTypeId',
    label: 'نوع الباخرة',
    create: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/ShipType?deleted=false',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'shipType',
    label: 'نوع الباخرة',
    icon: 'mdi-ship-wheel',
    create: false,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/ShipType?deleted=false',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'shapeType',
    label: 'شكل الباخرة',
    icon: 'mdi-shape',
    create: true,
    filterable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        valueFrom: 'shapeType.value',
        takeFrom: 'shapeType.title',
        items: [
          { name: 'Normal', id: 0 },
          { name: 'Locomotive', id: 1 },
          { name: 'Trailer', id: 2 },
        ],
      },
    },
  },
  {
    key: 'fromWeight',
    label: 'من وزن الباخرة (GRT) ',
    icon: 'mdi-ship-wheel',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'toWeight',
    label: 'الى وزن الباخرة (GRT) ',
    icon: 'mdi-ship-wheel',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'fromLength',
    label: 'من طول الباخرة',
    icon: 'mdi-ship-wheel',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'toLength',
    label: 'الى طول الباخرة',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },
  {
    key: 'countryId',
    label: 'جنسية الباخرة',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/country',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'shipTypeId',
    label: 'نوع الباخرة',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/ShipType',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
]

const openAddUserShip = (item: any) => {
  shipStore.setData(item)
  shipStore.setUserShipDialog(true)
}
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="البواخر"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #shapeType="{ item }">
      <VChip color="primary">
        {{ item.shapeType.title }}
      </VChip>
    </template>
    <template #shipType="{ item }">
      <VChip color="primary">
        {{ item.shipType }}
      </VChip>
    </template>
    <template #footer="{ item }">
      <VBtn
        block
        color="primary"
        @click="openAddUserShip(item)"
      >
        <VIcon class="mx-2">
          mdi-account-plus
        </VIcon>
        وكلاء الباخرة
      </VBtn>
    </template>
  </AppTable>
  <AddUserShipDialog />
</template>
