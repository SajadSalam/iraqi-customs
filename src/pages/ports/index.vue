<script setup lang="ts">
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { customClearanceStatus } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import { baseURL } from '@/plugins/sw-axios'

const urls = ref<ApiUrls>({
  get: '/custom-clearance?status=10',
  delete: '/custom-clearance',
  create: '/custom-clearance',
  update: '/custom-clearance',
})

const userStore = useUserStore()
const status = ref(null)

const tableFields: TableField[] = [
  {
    key: 'certificate.customer.ceo.fullName',
    label: 'اسم المدير المفوض',
    filterable: false,
    create: false,
  },
  {
    key: 'certificate.customer.ceo.phoneNumber',
    label: 'رقم الهاتف',
    filterable: false,
    disableFormat: true,
    create: false,
  },
  {
    key: 'certificate.customer.ceo.passportNumber',
    label: 'رقم الهوية',
    filterable: false,
    disableFormat: true,
    create: false,
  },
  {
    key: 'certificate.customer.ceo.passportDate',
    label: 'تاريخ الهوية',
    filterable: false,
    create: false,
  },

  {
    key: 'number',
    label: 'رقم التصريحة',
    filterable: true,
    isMainFilter: true,
    field: {
      type: FieldType.Text,
    },
    disableFormat: true,
    create: false,
  },

  {
    key: 'status',
    label: 'الحالة',
    filterable: false,
    disableFormat: true,
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
    title="المنافذ"
    :urls="urls"
    add-btn-text="اضافة عنوان"
    disable-crud
    have-actions
    sw
    hide-view-type
    :view-type="ViewType.Table"
  >
    <template #customer.ceo.fullName="{ item }">
      <div class="d-flex align-center gap-3">
        <img
          height="50"
          width="50"
          style="border-radius: 50%;"
          :src="baseURL + item.customer.ceo.image"
        >
        <div class="text-h5 p-0 m-0">
          {{ item.customer.ceo.fullName }}
          <br>

          <small>
            {{ item.customer.ceo.governorate }}
          </small>
          <div class="text-h6 p-0 m-0" />
        </div>
      </div>
    </template>
    <template #status="{ item }">
      <VChip :color="getEnum(customClearanceStatus, item.status).color">
        {{ getEnum(customClearanceStatus, item.status).arName }}
      </VChip>
    </template>
    <template #actions="{ item }">
      <VBtn
        icon
        variant="tonal"
        color="secondary"
        rounded="circle"
        :to="`/ports/${item.id}`"
        class="my-1"
      >
        <VIcon size="24">
          mdi-eye
        </VIcon>
      </VBtn>
    </template>
  </AppTable>
</template>
