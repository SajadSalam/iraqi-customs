<script lang="ts" setup>
import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import { VProgressCircular } from 'vuetify/lib/components/index.mjs'
import type { ClearanceDetails } from '../custom-clearnace/types'
import { CustomClearanceStatus } from '../custom-clearnace/types'
import { useCustomClearanceService } from '../custom-clearnace/utils'
import Certificate from '@/views/custom-clearnace/detials/Certificate.vue'
import ChangeStatusDialog from '@/views/custom-clearnace/detials/clearance/change-status-dialog.vue'
import CustomerInfo from '@/views/custom-clearnace/detials/clearance/customer-info.vue'
import CustomsInfo from '@/views/custom-clearnace/detials/clearance/customs-info.vue'
import ImportInfo from '@/views/custom-clearnace/detials/clearance/import-info.vue'
import MainDetials from '@/views/custom-clearnace/detials/clearance/main-detials.vue'
import DeliveryOrder from '@/views/custom-clearnace/detials/DeliveryOrder.vue'
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

const tabs = [

  {
    title: 'التصريحة الكمركية',
    value: 'customClearance',
  },

  {
    title: 'إجازة الاستيراد',
    value: 'importPermit',
  },
  {
    title: 'امر التسليم',
    value: 'deliveryOrder',
  },

]

const selectedDetialsTab = ref<string>('customClearance')
const router = useRouter()

const changeStatus = async (status: CustomClearanceStatus) => {
  try {
    await customClearanceService.changeStatus(customClearance.value.id!, 'change-status', {
      status,
    })
    isChangeStatusDialogOpen.value = false
    router.push('/ports')
  }
  catch (error) {
    console.error(error)
  }
}

const state = ref({
  options: {
    penColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  disabled: false,
})

const colors = [
  {
    color: 'rgb(51, 133, 255)',
  },

  {
    color: 'rgb(85, 255, 51)',
  },

  {
    color: 'rgb(255, 85, 51)',
  },
]

const activeColor = ref()

const signature = ref()

const handleSave = (t: string) => {
  return console.log(signature.value.undo())
}

const handleClear = (t: string) => {
  return signature.value.clearCanvas()
}

const handleUndo = (t: string) => {
  return signature.value.undo()
}

const handleDisabled = () => {
  return state.disabled = !state.disabled
}

const handleFromDataURL = (url: string) => {
  return signature.value.fromDataURL(url)
}

const handleAddWaterMark = () => {
  return signature1.value.addWaterMark({
    text: 'Selemondev', // watermark text, > default ''
    font: '20px Arial', // mark font, > default '20px sans-serif'
    style: 'all', // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
    fillStyle: 'red', // fillcolor, > default '#333'
    strokeStyle: 'blue', // strokecolor, > default '#333'
    x: 100, // fill positionX, > default 20
    y: 200, // fill positionY, > default 20
    sx: 100, // stroke positionX, > default 40
    sy: 200, // stroke positionY, > default 40
  })
}
</script>

<template>
  <div v-if="!isLoading">
    <VTabs
      v-model="selectedDetialsTab"
      align-tabs="center"
      class="do-tabs px-3 mb-2"
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

    <div
      v-if="selectedDetialsTab === 'customClearance'"
      class="d-flex flex-column gap-2"
    >
      <MainDetials :clearance="customClearance" />
      <CustomerInfo :clearance="customClearance" />
      <CustomsInfo
        :clearance="customClearance"
        :delivery-items="deliveryItems "
        :delivery-order="deliveryOrder"
      />
    </div>
    <div
      v-if="selectedDetialsTab === 'importPermit'"
      class="d-flex flex-column gap-2"
    >
      <Certificate
        class="my-5"
        :data="customClearance.certificate"
      />
      <ImportInfo :clearance="customClearance" />
    </div>
    <div v-if="selectedDetialsTab === 'deliveryOrder'">
      <DeliveryOrder
        :delivery-order="deliveryOrder"
        :delivery-items="deliveryItems"
      />
    </div>
  </div>
  <div v-if="!isLoading" class="sticky-btns d-flex justify-end ">
    <ChangeStatusDialog
      v-model="isChangeStatusDialogOpen"
      title="السماح بالخروج واكمال التصريحة"
      @submitted="changeStatus(CustomClearanceStatus.SecurityCheck)"
    >
      <h2 class="mb-5">
        توقيع تصريحة الخروج
      </h2>
      <div
        style="border: 1px #ddd solid;"
        class="rounded"
      >
        <VueSignaturePad
          ref="signature"
          height="400px"
          width="1280px"
          :max-width="2"
          :min-width="2"
          :disabled="state.disabled"
          :options="{
            penColor: state.options.penColor, backgroundColor: state.options.backgroundColor,
          }"
        />
      </div>
    </ChangeStatusDialog>
    <VBtn
      color="primary"
      @click="isChangeStatusDialogOpen = true"
    >
      <VIcon>
        mdi-check
      </VIcon>
      السماح بالخروج
    </VBtn>
  </div>
  <div
    v-if="isLoading"
    class="d-flex justify-center align-center"
  >
    <VProgressCircular
      indeterminate
      size="150"
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

.sticky-btns {
  position: sticky;
  z-index: 1000;
  bottom: 0;
  left: 0;
  padding: 10px;
}
</style>
