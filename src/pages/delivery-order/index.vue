<script lang="ts" setup>
import { filter } from './filter'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { DeliveryOrderStatusEnum } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import swAxios from '@/plugins/sw-axios'
import { useUserStore } from '@/stores/UserStore'
import CreateCustomClearance from '@/views/custom-clearnace/CreateCustomClearance.vue'

const userStore = useUserStore()
const router = useRouter()

const urls = ref<ApiUrls>({
  get: '/deliveryOrder?isExport=false',
  delete: '/deliveryOrder',
  update: '/deliveryOrder',
  create: '/deliveryOrder',
})

const customer = ref(null)

onMounted(async () => {
  if (userStore.user.customerId) {
    const { data } = await swAxios.get(`/customer/${userStore.user.customerId}`)

    // urls.value.get = `/deliveryOrder?isExport=false&customerId=${data.relatedId}`
  }
  customer.value = ''
})

const tableFields: TableField[] = [
  {
    key: 'number',
    label: 'رقم الامر',
    isMain: true,
    isMainFilter: true,
  },

  {
    label: 'المستفيد',
    key: 'customer',
    icon: 'mdi-account',
  },
  {
    label: 'الوكيل',
    key: 'agent',
    icon: 'mdi-account-badge',
  },
  {
    label: 'المدير المفوض',
    key: 'commissionerDirector',
    icon: 'mdi-account',
    cardViewCols: 4,
  },
  {
    label: ' تصحيح اسم',
    key: 'isCorrectName',
    icon: 'mdi-account-check-outline',
    cardViewCols: 4,
  },
  {
    label: 'عملية تنازل',
    key: 'isTransfer',
    icon: 'mdi-transfer-down',
    cardViewCols: 4,
  },
  {
    label: 'المكتب',
    key: 'office',
    icon: 'mdi-office-building',
    cardViewCols: 6,
  },
  {
    label: 'تم الانشاء بواسطة',
    key: 'creationBy.fullName',
    icon: 'mdi-office-building',
    cardViewCols: 6,
  },

  ...filter,
]

const clicked = (item: any) => {
  if (item.status !== 6)
    router.push({ name: 'delivery-order-item-id', params: { id: item.id } })
}

const isCreateCerticateDialogOpen = ref(false)
const deliveryOrder = ref<any>({})

const openCreateCerticate = (item: any) => {
  deliveryOrder.value = item
  isCreateCerticateDialogOpen.value = true
}
</script>

<template>
  <AppTable
    v-if="customer !== null"
    :view-type="ViewType.Cards"
    hide-view-type
    :on-row-click="clicked"
    :fields="tableFields"
    disable-crud
    pagination
    title="اوامر التسليم"
    :urls="urls"
    hide-edit
    add-btn-text="اضافة"
    have-actions
  >
    <template #headerActions>
      <!--
        <VBtn
        v-if="userStore.havePermission('DeliveryOrder-Create')"
        color="primary"
        variant="tonal"
        @click="$router.push({ name: 'delivery-order-add' })"
        >
        <VIcon>mdi-plus</VIcon>
        اضافة
        </VBtn>
      -->
    </template>
    <template #headerBtns="{ item }">
      <VChip
        variant="tonal"
        :color="
          DeliveryOrderStatusEnum.find((x) => x.value === item.status)?.color
        "
      >
        {{
          DeliveryOrderStatusEnum.find((x) => x.value === item.status)?.arName
        }}
      </VChip>
    </template>
    <template #isTransfer="{ item }">
      <VChip
        color="primary"
        text-color="white"
      >
        {{ item.customerAssignee ? "نعم" : "لا" }}
      </VChip>
    </template>
    <template #isCorrectName="{ item }">
      <VChip
        color="primary"
        text-color="white"
      >
        {{ item.isCorrectName ? "نعم" : "لا" }}
      </VChip>
    </template>
    <template #footer="{ item }">
      <VRow>
        <VCol
          cols="12"
          md="12"
        >
          <VBtn
            color="primary"
            block
            @click.stop="openCreateCerticate(item)"
          >
            <VIcon>
              mdi-file-document-edit
            </VIcon>
            طلب تصريحة كمركية
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </AppTable>
  <CreateCustomClearance
    v-model:model-value="isCreateCerticateDialogOpen"
    :delivery-order-id="deliveryOrder.id"
    :customer-id="deliveryOrder.commissionerDirector"
  />
</template>
