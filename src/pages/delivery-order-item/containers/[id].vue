<script setup lang="ts">
import { isEmpty, isNullOrUndefined } from '@/@core/utils'
import CarForm from '@/views/pages/delivery-order/CarForm.vue'
import GoodsForm from '@/views/pages/delivery-order/GoodsForm.vue'
import axios from '@axios'

interface Container {
  number: string
  id: string
  customerInfo: string

}
interface OpenContainerBody {
  containers: {
    containerId: string
    fillStatus: 1 | 2 | 3
    details: {
      customer?: Record<string, unknown> | null
      customerId?: string | null
      goods?: {
        goodTypeId: string
        number?: string
        size: number
        weight: number
        quantity: number
        goodsDetails?: string
        customerInfo?: string
      }
      car?: {
        number?: string
        size?: number
        weight?: number
        carType: string
        carBrand?: string
        carModel: string
        carColor?: string
        vinNo?: string
        carDetails?: string
        isDamage?: boolean
        customerInfo?: string
      }
      isWaiver: boolean
    }[]
  }[]
}
enum Tabs {
  Cars,
  Goods,
}
const route = useRoute()
const query = computed(() => route.query)
const id = computed(() => route.params.id)
const router = useRouter()
const opened = ref<string | null>(null)
const body = ref<OpenContainerBody>({} as OpenContainerBody)
const selectedTab = ref(Tabs.Cars)
const selectedContainer = ref('')
const containers = ref<Container>([])
const isLoading = ref(false)
const form = ref<any>(null)

const selectedContainerBody = computed({
  get: () => body.value.containers.find(container => container.containerId === selectedContainer.value),
  set: value => {
    const index = body.value.containers.findIndex(container => container.containerId === selectedContainer.value)
    if (index !== -1)
      body.value.containers[index] = value
  },
})

const selectedDetials = computed({
  get: () => {
    const container = body.value.containers.find(container => container.containerId === selectedContainer.value)
    if (selectedTab.value === Tabs.Cars)
      return container?.details.filter(detail => detail.car != null) || []
    else
      return container?.details.filter(detail => detail.goods != null) || []
  },
  set: value => {
    const container = body.value.containers.find(container => container.containerId === selectedContainer.value)
    if (selectedTab.value === Tabs.Cars)
      container.details = value.map(detail => ({ ...detail, goods: null }))
    else
      container.details = value.map(detail => ({ ...detail, car: null }))
  },
})

const initializeBody = (initContainers: Container[]) => {
  body.value = {
    containers: initContainers.map(container => ({
      containerId: container.id,
      fillStatus: 1,
      details: [],
    })),
  }
}

const fetchDeliveryOrderContainers = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrderItem/${id.value}`)
    const fetchedContainers = data.result.data[0].containers
    const selectedContainers = fetchedContainers.filter((container: Container) => query.value.containersId?.includes(container.id))

    // map to Container interface
    containers.value = selectedContainers.map((container: any) => ({
      number: container.number,
      id: container.id,
      customerInfo: container.customerInfo,
    }))
    initializeBody(containers.value)
    selectedContainer.value = containers.value[0].id
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (isNullOrUndefined(query.value.containersId))
    router.push(`/delivery-order-item/${id.value}`)
  else fetchDeliveryOrderContainers()
})

const addCar = (containerId: string) => {
  const container = body.value.containers.find(container => container.containerId === containerId)
  if (container) {
    container.details.push({
      car: {
        carType: '',
        carModel: '',
        size: 0,
        weight: 0,
        carDetails: '',
        isDamage: false,
        customerInfo: '',
      },
      isWaiver: false,
    })
  }
}

const addGoods = (containerId: string) => {
  const container = body.value.containers.find(container => container.containerId === containerId)
  if (container) {
    container.details.push({
      goods: {
        goodTypeId: '',
        size: 0,
        weight: 0,
        quantity: 0,
        goodsDetails: '',
        customerInfo: '',
      },
      isWaiver: false,
    })
  }
}

const addDetial = () => {
  if (selectedTab.value === Tabs.Cars)
    addCar(selectedContainer.value)
  else
    addGoods(selectedContainer.value)
}

const setNullToEmptyDeep = (obj: any) => {
  for (const key in obj) {
    if (isEmpty(obj[key])) {
      obj[key] = null
    }
    else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => {
        if (typeof item === 'object')
          setNullToEmptyDeep(item)
      })
    }
    else if (typeof obj[key] === 'object') {
      setNullToEmptyDeep(obj[key])
    }
  }

  return obj
}

const postData = async () => {
  const isValid = await form.value.validate()

  if (!isValid.valid)
    return

  isLoading.value = true
  try {
    const mappedBody = {
      containers: body.value.containers.filter(container => !isEmpty(container.details)),
    }

    console.log('mappedBody', mappedBody)

    await axios.put(`/DeliveryOrderItem/${id.value}/open`, mappedBody)

    router.push(`/delivery-order-item/${id.value}`)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-center">
      <h1 class="text-h3">
        تفريغ الحاويات
      </h1>
      <VSpacer />
      <!-- back -->
      <VBtn
        color="error"
        variant="text"
        @click="router.go(-1)"
      >
        <VIcon>
          mdi-arrow-left
        </VIcon>
        رجوع
      </VBtn>
      <VBtn
        color="secondary"
        size="large"
        class="rounded"
        @click="postData"
      >
        <VIcon class="mx-2">
          mdi-content-duplicate
        </VIcon>
        حفظ معلومات التفريغ
      </VBtn>
    </div>
    <div class="containers-tabs">
      <VTabs
        v-model="selectedContainer"
        fixed-tabs
        slider-color="transparent"
        density="comfortable"
        grow
        class="mt-3"
      >
        <VTab
          v-for="container in containers"
          :key="container.id"

          :value="container.id"
        >
          {{ container.number }}
        </VTab>
      </VTabs>
    </div>
    <div v-if="selectedContainer">
      <div class="d-flex align-center my-3">
        <VLabel>
          نوع الفتح :
        </VLabel>
        <VRadioGroup
          v-model="selectedContainerBody.fillStatus"
          class="mr-10"
          inline
        >
          <VRadio
            class="mx-5"
            dir="ltr"
            :value="3"
          >
            جزئي
          </VRadio>
          <VRadio :value="2">
            كلي
          </VRadio>
        </VRadioGroup>
        <VSpacer />
        <VBtn
          :color="selectedTab === Tabs.Cars ? 'primary' : 'warning'"
          @click="addDetial"
        >
          <VIcon>
            {{ selectedTab === Tabs.Goods ? 'mdi-package-variant-closed' : 'mdi-car' }}
          </VIcon>
          اضافة
          {{ selectedTab === Tabs.Goods ? 'بضاعة' : 'سيارة' }}
        </VBtn>
      </div>
      <VTabs
        v-model="selectedTab"
        align-tabs="center"
        class="do-tabs my-5 "
        height="60px"
        fixed-tabs
        @update:model-value="opened = null"
      >
        <VTab>
          السيارات
        </VTab>
        <VTab>
          البضائع
        </VTab>
      </VTabs>
      <VForm
        ref="form"
        :key="opened"
      >
        <VExpansionPanels
          :key="selectedContainer"
          v-model="opened"
        >
          <VExpansionPanel
            v-for="(detail, i) in (selectedDetials)"
            :key="selectedTab === Tabs.Cars ? `car${i}-${selectedContainer}` : `goods${i}-${selectedContainer}`"
            :value="selectedTab === Tabs.Cars ? `car${i}-${selectedContainer}` : `goods${i}-${selectedContainer}`"
          >
            <template #actions>
              <VBtn
                color="error"
                @click="body.details.splice(index, 1)"
              >
                <VIcon>mdi-delete</VIcon>
              </VBtn>
            </template>
            <VExpansionPanelTitle>
              <template #default="{ expanded }">
                <VRow no-gutters>
                  <VCol
                    cols="4"
                    class="d-flex justify-start align-center"
                  >
                    <VIcon
                      size="30"
                      color="primary"
                      :icon="!detail.car?.isDamage ? 'mdi-package-variant-closed' : 'mdi-car'"
                    />
                    <span :class="`font-weight-bold mx-2 ${expanded ? 'text-primary' : ''}`">
                      {{ detail.goods ? 'بضاعة' : 'سيارة' }}
                      :
                      {{ detail.goods ? detail.goods.number : detail.car?.vinNo }}
                    </span>
                  </VCol>
                  <VCol
                    cols="4"
                    class="text-grey"
                  />
                  <VCol
                    cols="4"
                    class="d-flex justify-end"
                  >
                    <VBtn
                      color="error"
                      variant="text"
                      @click.stop="deleteDetail(i)"
                    >
                      <VIcon>mdi-delete</VIcon>
                      حذف
                    </VBtn>
                  </VCol>
                </VRow>
              </template>
            </VExpansionPanelTitle>
            <VExpansionPanelText
              :key="`car${i}-${selectedContainer}`"
              class="my-2"
            >
              <CarForm
                v-if="selectedTab === Tabs.Cars"
                :key="`car${i}-${selectedContainer}`"
                v-model="selectedDetials[i]"
              />
              <GoodsForm
                v-if="selectedTab === Tabs.Goods"
                :key="`goods${i}-${selectedContainer}`"
                v-model="selectedDetials[i]"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VForm>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center mt-16"
    >
      <h2 class="text-h3">
        قم بتحديد حاوية
      </h2>
    </div>
  </div>
</template>

<style lang="scss">
.containers-tabs {
  .v-tabs {
    border-bottom: 0 !important;

    .v-tab {
      border-radius: 18px !important;
      margin-bottom: 5px !important;
      background-color: #f5f5f5;
      color: #000;

      &.v-tab--active {
        background-color: #f5f5f5;
        color: #000;
      }

      .v-tab__slider {
        display: none;
      }
    }
  }
}
</style>
