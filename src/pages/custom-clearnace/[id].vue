<script lang="ts" setup>
import type { ClearanceDetails } from './types'
import { CustomClearanceStatus } from './types'
import { useCustomClearanceService } from './utils'
import Certificate from '@/views/custom-clearnace/detials/Certificate.vue'
import ChangeStatusDialog from '@/views/custom-clearnace/detials/clearance/change-status-dialog.vue'
import CustomerInfo from '@/views/custom-clearnace/detials/clearance/customer-info.vue'
import CustomsInfo from '@/views/custom-clearnace/detials/clearance/customs-info.vue'
import GoodsPrice from '@/views/custom-clearnace/detials/clearance/goods-price.vue'
import ImportInfo from '@/views/custom-clearnace/detials/clearance/import-info.vue'
import MainDetials from '@/views/custom-clearnace/detials/clearance/main-detials.vue'
import DeliveryOrder from '@/views/custom-clearnace/detials/DeliveryOrder.vue'
import AuditorForm from '@/views/custom-clearnace/forms/auditor-form.vue'
import CheckForm from '@/views/custom-clearnace/forms/check-form.vue'
import CheckerForm from '@/views/custom-clearnace/forms/checker-form.vue'
import FormCard from '@/views/landing-page/application-form/form-card.vue'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'
import { Tabs } from '@/views/pages/delivery-order-item/types'

const route = useRoute()
const id = computed(() => route.params.id)
const customClearance = ref<ClearanceDetails>({})
const deliveryOrder = ref<any>({})
const deliveryItems = ref<any>([])
const isLoading = ref<boolean>(true)
const customClearanceService = useCustomClearanceService()

const fetchData = async () => {
  isLoading.value = true
  try {
    customClearance.value = await customClearanceService.fetchCustomClearance(id.value)
    deliveryOrder.value = await customClearanceService.fetchDeliveryOrder(customClearance.value.deliveryOrder)
    deliveryItems.value = await customClearanceService.fetchDeliveryOrderItems(customClearance.value?.deliveryOrder)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

const selectedTab = ref<string>('deliveryOrder')

const tabs = [
  {
    title: 'امر التسليم',
    value: 'deliveryOrder',
  },
  {
    title: 'إجازة الاستيراد',
    value: 'importPermit',
  },

]

const isStatus = (status: CustomClearanceStatus) => customClearance.value?.status === status

onMounted(() => {
  fetchData()
})

const isChangeStatusDialogOpen = ref<boolean>(false)

watch(isChangeStatusDialogOpen, value => {
  if (!value)
    fetchData()
})

const itemsTab = ref<Tabs>(Tabs.Cars)

const goodsData = computed(() => {
  let data = []
  if (deliveryItems.value.cars.length > 0) {
    data = deliveryItems.value.cars
    itemsTab.value = Tabs.Cars
  }
  else if (deliveryItems.value.containers.length > 0) {
    data = deliveryItems.value.containers
    itemsTab.value = Tabs.Containers
  }
  else if (deliveryItems.value.goods.length > 0) {
    data = deliveryItems.value.goods
    itemsTab.value = Tabs.Goods
  }
  else {
    itemsTab.value = Tabs.Cars
  }

  return data
})

const selectedDetialsTab = ref<string>('main')

const { user } = useUserStore()
const router = useRouter()

const changeStatus = async (status: CustomClearanceStatus) => {
  try {
    await customClearanceService.changeStatus(customClearance.value.id, 'change-status', {
      status,
    })
    isChangeStatusDialogOpen.value = false
    router.push('/custom-clearnace')
  }
  catch (error) {
    console.error(error)
  }
}

const nextStatus = computed(() => {
  const status = {
    text: '',
    status: CustomClearanceStatus.Auditor,
  }

  if (isStatus(CustomClearanceStatus.Pending)) {
    status.status = CustomClearanceStatus.Check
    status.text = 'مطابقة ونقل التصريحة للكشف'
  }
  else if (isStatus(CustomClearanceStatus.Auditor)) {
    status.status = CustomClearanceStatus.Manager
    status.text = 'تم تدقيق المعلومات \ نقل الى مدير الكمارك'
  }
  else if (isStatus(CustomClearanceStatus.Manager)) {
    status.status = CustomClearanceStatus.TaxWriter
    status.text = 'تم تدقيق المعلومات \ نقل الى كاتب الضرائب'
  }
  else if (isStatus(CustomClearanceStatus.TaxWriter)) {
    status.status = CustomClearanceStatus.TaxChecker
    status.text = 'تم تدقيق المعلومات \ نقل الى فاحص الضرائب'
  }
  else if (isStatus(CustomClearanceStatus.TaxChecker)) {
    status.status = CustomClearanceStatus.TaxComplete
    status.text = 'تم تدقيق المعلومات \ نقل الى مدير الضرائب'
  }
  else if (isStatus(CustomClearanceStatus.TaxComplete)) {
    status.status = CustomClearanceStatus.MerchantComplete
    status.text = 'دفع الاجور وتسليم الاوراق'
  }

  else if (isStatus(CustomClearanceStatus.MerchantComplete)) {
    status.status = CustomClearanceStatus.Ports
    status.text = 'طلب تصريحة خروج'
  }

  return status
})

const isOnlyChangeStatus = computed(() => {
  return isStatus(CustomClearanceStatus.Pending)
    || isStatus(CustomClearanceStatus.Auditor)
    || isStatus(CustomClearanceStatus.Manager)
    || isStatus(CustomClearanceStatus.TaxWriter)
    || isStatus(CustomClearanceStatus.TaxChecker)
    || isStatus(CustomClearanceStatus.TaxComplete)
    || isStatus(CustomClearanceStatus.MerchantComplete)
})
</script>

<template>
  <div v-if="!isLoading">
    <div class="d-flex align-end justify-end mb-2">
      <VBtn
        v-if="isOnlyChangeStatus && user.role !== 'Customer'"
        color="primary"
        size="large"
        rounded="xl"
        @click="isChangeStatusDialogOpen = true"
      >
        <VIcon
          class="ml-2"
          size="25"
        >
          mdi-check-network-outline
        </VIcon>
        {{ nextStatus.text }}
      </VBtn>
      <VBtn
        v-if="isStatus(CustomClearanceStatus.Check) && user.role === 'Check'"
        color="primary"
        size="large"
        rounded="xl"
        @click="isChangeStatusDialogOpen = true"
      >
        <VIcon
          class="ml-2"
          size="25"
        >
          mdi-check-network-outline
        </VIcon>
        مطابقة ونقل التصريحة للكاشف
      </VBtn>
      <VBtn
        v-if="isStatus(CustomClearanceStatus.Checker) && user.role === 'Checker'"
        color="warning"
        size="large"
        rounded="xl"
        @click="isChangeStatusDialogOpen = true"
      >
        <VIcon
          class="ml-2"
          size="25"
        >
          mdi-check-network-outline
        </VIcon>
        تم مطابقة المعلومات
      </VBtn>
    </div>
    <CheckForm
      v-if="isStatus(CustomClearanceStatus.Check)"
      v-model="isChangeStatusDialogOpen"
      :detials="customClearance"
    />
    <CheckerForm
      v-if="isStatus(CustomClearanceStatus.Checker)"
      v-model="isChangeStatusDialogOpen"
      :detials="customClearance"
    />
    <AuditorForm
      v-if="isStatus(CustomClearanceStatus.Auditor)"
      v-model="isChangeStatusDialogOpen"
      :detials="customClearance"
    />
    <ChangeStatusDialog
      v-if="isOnlyChangeStatus"
      v-model="isChangeStatusDialogOpen"

      :title="nextStatus.text"
      @submitted="changeStatus(nextStatus.status)"
    />
    <VTabs
      v-if="customClearance?.status > 2"
      v-model="selectedDetialsTab"
      align-tabs="center"
      class="do-tabs px-3 mb-2"
      height="60px"
      fixed-tabs
    >
      <VTab value="main">
        تفاصيل التصريحة
      </VTab>
      <VTab value="price">
        تخمين السعر
      </VTab>
    </VTabs>
    <div v-if="selectedDetialsTab === 'main'">
      <VRow>
        <VCol
          cols="12"
          md="7"
        >
          <VCard>
            <VCardTitle class="pa-5">
              تفاصيل التصريحة الكمركية
            </VCardTitle>
            <VCardText class="d-flex flex-column gap-5">
              <MainDetials :clearance="customClearance" />
              <CustomerInfo
                v-if="!isStatus(CustomClearanceStatus.Checker)"
                :clearance="customClearance"
              />
              <CustomsInfo
                v-if="!isStatus(CustomClearanceStatus.Checker)"
                :clearance="customClearance"
                :delivery-items="deliveryItems "
                :delivery-order="deliveryOrder"
              />
              <ImportInfo
                v-if="!isStatus(CustomClearanceStatus.Checker)"
                :clearance="customClearance"
              />
              <div v-if="isStatus(CustomClearanceStatus.Checker)">
                <ItemsTable
                  :tab="itemsTab"
                  :loading="false"
                  :data="goodsData"
                  :has-filter="false"
                  :exlude-keys="[
                    'product',
                    'portSection.name',
                    'departmentGarage.name', 'actions', 'operations',
                  ]"
                />
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol
          cols="12"
          md="5"
          style="align-self: stretch;"
        >
          <VCard style="height: 100%;">
            <VCardTitle class="pa-5">
              نوع المستند
            </VCardTitle>
            <VTabs
              v-model="selectedTab"
              align-tabs="center"
              class="do-tabs px-3"
              height="60px"
              fixed-tabs
            >
              <VTab
                v-for="tab in tabs"
                :key="tab.value"
                :value="tab.value"
              >
                {{ tab.title }}
              </VTab>
            </VTabs>

            <VCardText class="pa-3">
              <DeliveryOrder
                v-if="selectedTab === 'deliveryOrder'"
                :delivery-order="deliveryOrder"
                :delivery-items="deliveryItems"
              />
              <Certificate
                v-else
                :data="customClearance.certificate"
              />
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12">
          <FormCard title="تفاصيل البضائع">
            لا يوجد بضائع مضافة
          </FormCard>
        </VCol>
        <VCol cols="12">
          <FormCard title="تفاصيل الرسوم">
            لا يوجد رسوم مضافة
          </FormCard>
        </VCol>
      </VRow>
    </div>

    <div v-if="selectedDetialsTab === 'price'">
      <GoodsPrice
        :clearance="customClearance"
        :delivery-order="deliveryOrder"
        :delivery-items="deliveryItems"
      />
    </div>
  </div>
  <div
    v-else
    class="d-flex align-center justify-center mt-16"
  >
    <VProgressCircular
      indeterminate
      size="150"
      color="primary"
    />
  </div>
</template>

<style lang="scss">
.label-p {
  padding: 0;
  margin: 1px;
  color: rgba(var(--v-theme-primary), 80%);
  font-weight: bold;
}
</style>
