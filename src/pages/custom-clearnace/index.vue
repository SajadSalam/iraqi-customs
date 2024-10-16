<script setup lang="ts">
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { customClearanceStatus } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import { baseURL } from '@/plugins/sw-axios'

const urls = ref<ApiUrls>({
  get: '/custom-clearance',
  delete: '/custom-clearance',
  create: '/custom-clearance',
  update: '/custom-clearance',
})

const userStore = useUserStore()
const status = ref(null)

onMounted(() => {
  /* TaxWriter
TaxChecker
TaxComplete
MerchantView
MerchantComplete */
  if (userStore.user.role === 'Employee')
    urls.value.get = '/custom-clearance?status=0'
  else if (userStore.user.role === 'Check')
    urls.value.get = '/custom-clearance?status=1'
  else if (userStore.user.role === 'Checker')
    urls.value.get = '/custom-clearance?status=2'
  else if (userStore.user.role === 'Auditor')
    urls.value.get = '/custom-clearance?status=3'
  else if (userStore.user.role === 'Manager')
    urls.value.get = '/custom-clearance?status=4'
  else if (userStore.user.role === 'TaxWriter')
    urls.value.get = '/custom-clearance?status=5'
  else if (userStore.user.role === 'TaxChecker')
    urls.value.get = '/custom-clearance?status=6'
  else if (userStore.user.role === 'TaxComplete')
    urls.value.get = '/custom-clearance?status=7'
  // else if (userStore.user.role === 'MerchantView')
  //   urls.value.get = '/custom-clearance?status=8'
  else if (userStore.user.role === 'MerchantComplete')
    urls.value.get = '/custom-clearance?status=8'
  else if (userStore.user.role === 'Ports')
    urls.value.get = '/custom-clearance?status=9'
  else if (userStore.user.role === 'SecurityCheck')
    urls.value.get = '/custom-clearance?status=10'
  else if (userStore.user.role === 'Customer')
    urls.value.get = `/custom-clearance?customerId=${userStore.user.customerId}`
  else
    urls.value.get = '/custom-clearance'

  status.value = userStore.user.role
})

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
  {{ userStore.user.role }}
  <AppTable

    v-if="status !== null"
    :fields="tableFields"
    pagination
    title="التصريحات الكمركية"
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
        :to="`/custom-clearnace/${item.id}`"
        class="my-1"
      >
        <VIcon size="24">
          mdi-eye
        </VIcon>
      </VBtn>
    </template>
  </AppTable>
</template>
