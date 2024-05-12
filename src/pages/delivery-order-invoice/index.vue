<script setup lang="ts">
import { FieldType } from '@/components/app-form/types'
import { type TableField, ViewType } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'

const urls: ApiUrls = {
  get: '/DeliveryOrder/invoices',
  create: '/DeliveryOrder/invoices',
  update: '/DeliveryOrder/invoices',
  delete: '/DeliveryOrder/invoices',
}

const fields: TableField[] = [
  {
    key: 'listDate',
    label: 'تاريخ الفاتورة',
  },
  {
    key: 'listNo',
    label: 'رقم الفاتورة',
    disableFormat: true,
    filterable: true,
    isMainFilter: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'deliveryOrderNumber',
    label: 'رقم امر التسليم',
    disableFormat: true,
    filterable: true,
    isMainFilter: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'officeId',
    label: 'المكتب',
    hideInTable: true,

    // disableFormat: true,
    filterable: true,
    isMainFilter: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/office',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'office',
    label: 'المكتب',
    field: {
      type: FieldType.Text,
    },
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
    key: 'payDate',
    label: 'تاريخ الدفع',
  },
  {
    key: 'status',
    label: 'الحالة',
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: PayStatusEnum,
        itemValue: 'value',
        itemLabel: 'arName',
      },
    },
  },

  {
    key: 'totalPriceFrom',
    label: 'من السعر الكلي',
    disableFormat: true,
    filterable: true,
    hideInTable: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'totalPriceTo',
    label: 'الى السعر الكلي',
    disableFormat: true,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'raiyaPriceFrom',
    label: 'من نسبة الادارة الالكترونية',
    hideInTable: true,
    disableFormat: true,
    filterable: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'raiyaPriceTo',
    label: 'الى نسبة الادارة الالكترونية',
    hideInTable: true,
    disableFormat: true,
    filterable: true,
    field: {
      type: FieldType.Text,
    },
  },
  {
    key: 'listDateFrom',
    label: 'من تاريخ الفاتورة',
    hideInTable: true,
    disableFormat: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'listDateTo',
    label: 'الى تاريخ الفاتورة',
    hideInTable: true,
    disableFormat: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },

]
</script>

<template>
  <AppTable
    :urls="urls"
    title="فواتير امر التسليم"
    pagination
    :have-actions="false"
    add-btn-text="t"
    :fields="fields"
    :view-type="ViewType.Table"
    hide-view-type
    disable-crud
  >
    <template #status="{ item }">
      <VChip :color="getEnum(PayStatusEnum, item.status).color">
        {{ getEnum(PayStatusEnum, item.status).arName }}
      </VChip>
    </template>
    <template #deliveryOrderNumber="{ item }">
      <a
        rel="noopener noreferrer"
        target="_blank"
        :href="`/delivery-order-item/${item.deliveryOrderId}`"
      >
        {{ item.deliveryOrderNumber }}
      </a>
    </template>
    <template #payType="{ item }">
      <VChip :color="getEnum(PayTypeEnum, item.payType).color">
        {{ getEnum(PayTypeEnum, item.payType).arName }}
      </VChip>
    </template>
  </AppTable>
</template>
