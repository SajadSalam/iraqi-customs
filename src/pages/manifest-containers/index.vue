<script lang="ts" setup>
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ContainerStateEnum, ContainerStatusEnum, ContainerTypeEnum } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'

const urls: ApiUrls = {
  get: '/Container',
  delete: '/Container',
  create: '/Container',
  update: '/Container',
}

const tableFields: TableField[] = [

  {
    key: 'containerInfo.number',
    label: 'رقم الحاوية ',
    isMain: true,
  },
  {
    key: 'containerNumber',
    label: 'رقم الحاوية ',
    create: true,
    filterable: true,
    hideInTable: true,
    icon: 'mdi-123',
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'containerInfo.size',
    label: 'حجم الحاوية ',
    icon: 'mdi-ruler',

  },
  {
    key: 'containerSize',
    label: 'حجم الحاوية ',
    hideInTable: true,
    filterable: true,
    icon: 'mdi-weight',
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'weight',
    label: 'وزن الحاوية ',
    icon: 'mdi-weight',
  },
  {
    key: 'containerLine',
    label: 'خط الحاوية ',
    create: true,
    filterable: true,
    icon: 'mdi-chart-line-variant',
    field: {
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'containerInfo.containerType',
    label: 'نوع الحاوية ',
    filterable: true,
    icon: 'mdi-access-point',
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: ContainerTypeEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'containerType',
    label: 'نوع الحاوية ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: ContainerTypeEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'containerState',
    label: 'حالة الحاوية ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: ContainerStateEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'fillStatus',
    label: 'ملء الحاوية ',
    create: false,
    filterable: true,
    icon: 'mdi-inbox-full-outline',
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: ContainerStatusEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },

  {
    key: 'port',
    label: 'الميناء',
    icon: 'mdi-ship-wheel',
  },
  {
    key: 'terminal',
    label: 'الرصيف',
    icon: 'tabler-barrier-block',
  },
  {
    key: 'containerState',
    label: 'حالة الحاوية',
    icon: 'mdi-laser-pointer',

  },
  {
    key: 'isEmpty',
    label: 'فارغة',
    icon: 'mdi-box-upload',
  },
  {
    key: 'isOpened',
    label: 'مفتوحة',
    icon: 'mdi-book-open-outline',
  },
  {
    key: 'containerWeightFrom',
    label: 'وزن الحاوية من ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'containerWeightTo',
    label: 'وزن الحاوية الى ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'hasDeliveryOrder',
    label: 'مضمنة بأمر تسليم',
    filterable: true,
    isMain: false,
    isMainFilter: true,
    icon: 'mdi-clipboard-list',
    field: {
      placeholder: 'مضمنة بأمر تسليم',
      defualtValue: null,
      type: FieldType.Select,
      options: {
        itemLabel: 'label',
        itemValue: 'value',
        items: [
          { value: true, label: 'نعم' },
          { value: false, label: 'لا' },
        ],
      },
    },
  },
  {
    key: 'trip.number',
    label: 'رقم الرحلة',

  },
  {
    key: 'trip.ship',
    label: 'الباخرة',
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="الحاويات"
    :urls="urls"
    add-btn-text=""
    hide-delete
    hide-edit
    disable-crud
  >
    <template #hasDeliveryOrder="{ item }">
      <a
        v-for="deliveryOrder in item.deliveryOrders"
        :key="deliveryOrder.id"
        :href="`/delivery-order-item/${deliveryOrder.id}`"
      >
        {{ deliveryOrder.number }}
      </a>
      <p v-if="item.deliveryOrders.length === 0">
        لا يوجد
      </p>
    </template>
    <template #containerInfo.containerType="{ item }">
      <VChip color="primary">
        {{ ContainerTypeEnum.find((x:any) => x.value === item.containerInfo.containerType)?.arName }}
      </VChip>
    </template>
    <template #containerState="{ item }">
      <VChip :color="item.containerState === 1 ? 'error' : 'success'">
        {{ ContainerStateEnum.find((x:any) => x.value === item.containerState)?.arName }}
      </VChip>
    </template>
    <template #fillStatus="{ item }">
      <VChip color="primary">
        {{ ContainerStatusEnum.find((x:any) => x.value === item.fillStatus)?.arName }}
      </VChip>
    </template>
    <template #isEmpty="{ item }">
      {{ item.isEmpty === true ? 'نعم' : 'لا' }}
    </template>
    <template #isOpened="{ item }">
      {{ item.isOpened === true ? 'نعم' : 'لا' }}
    </template>
    <template #trip.number="{ item }">
      <a
        :href="`/trips-port/${item.trip.id}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.trip.number }}
      </a>
    </template>
  </AppTable>
</template>

<style lang="" scoped></style>
