<script setup lang="ts">
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { baseURL } from '@/plugins/sw-axios'

const urls: ApiUrls = {
  get: '/customer?status=0',
  delete: '/customer',
  create: '/customer',
  update: '/customer',
}

const tableFields: TableField[] = [
  {
    key: 'ceo.fullName',
    label: 'اسم المدير المفوض',
    filterable: false,
    create: false,
  },
  {
    key: 'ceo.phoneNumber',
    label: 'رقم الهاتف',
    filterable: false,
    disableFormat: true,
    create: false,
  },
  {
    key: 'ceo.passportNumber',
    label: 'رقم الهوية',
    filterable: false,
    disableFormat: true,
    create: false,
  },
  {
    key: 'ceo.passportDate',
    label: 'تاريخ الهوية',
    filterable: false,
    create: false,
  },
  {
    key: 'company.nameAr',
    label: 'اسم الشركة',
    filterable: false,
    create: false,
  },
  {
    key: 'company.governorate',
    label: 'عنوان الشركة',
    filterable: false,
    create: false,
  },
  {
    key: 'company.taxNumber',
    label: 'الرقم الضريبي',
    disableFormat: true,
    filterable: false,
    create: false,
  },
  {
    key: 'company.chamberNumber',
    label: 'الرقم التجاري',
    disableFormat: true,
    filterable: false,
    create: false,
  },
  {
    key: 'creationDate',
    label: 'تاريخ الطلب',
    filterable: false,
    create: false,
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="طلبات شهادات الاستيراد"
    :urls="urls"
    add-btn-text="اضافة عنوان"
    disable-crud
    have-actions
    sw
    hide-view-type
    :view-type="ViewType.Table"
  >
    <template #ceo.fullName="{ item }">
      <div class="d-flex align-center gap-3">
        <img
          height="50"
          width="50"
          style="border-radius: 50%;"
          :src="baseURL + item.ceo.image"
        >
        <div class="text-h5 p-0 m-0">
          {{ item.ceo.fullName }}
          <br>

          <small>
            {{ item.ceo.governorate }}
          </small>
          <div class="text-h6 p-0 m-0" />
        </div>
      </div>
    </template>
    <template #actions="{ item }">
      <VBtn
        icon
        variant="tonal"
        color="secondary"
        rounded="circle"
        :to="`/pending-customers/${item.id}`"
        class="my-1"
      >
        <VIcon size="24">
          mdi-eye
        </VIcon>
      </VBtn>
    </template>
  </AppTable>
</template>
