<script setup lang="ts">
import type { OpenContainerBody } from './types'
import { isEmpty, isNullOrUndefined } from '@/@core/utils'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import CarForm from '@/views/pages/delivery-order/CarForm.vue'
import GoodsForm from '@/views/pages/delivery-order/GoodsForm.vue'
import axios from '@axios'

const emits = defineEmits(['update:refresh'])
const router = useRouter()
const deliveryOrderStore = useDeliveryOrderStore()
const route = useRoute()
const id = computed(() => route.params.id)

const deliveryOrder = computed({
  get: () => deliveryOrderStore.deliveryOrder,
  set: value => deliveryOrderStore.setDeliveryOrder(value),

})

const isLoading = ref(false)
const container = computed(() => deliveryOrderStore.container)

const body = ref<OpenContainerBody>({
  fillStatus: 1,
  deliveryOrderId: '',
  containerId: '',
  details: [],
})

const addCar = () => {
  body.value.details.unshift({
    customer: null,
    customerId: null,
    car: {
      number: '',
      size: 1,
      weight: 1,
      carType: '',
      carBrand: '',
      carModel: '',
      carColor: '',
      vinNo: '',
      carDetails: '',
      isDamage: false,
    },
    goods: null,
    isWaiver: false,
  })
}

const addGoods = () => {
  body.value.details.unshift({
    customer: null,
    customerId: null,
    car: null,
    goods: {
      goodTypeId: null,
      number: '',
      size: null,
      weight: null,
      quantity: null,
      goodsDetails: '',
    },
    isWaiver: false,
  })
}

const form = ref<VForm>()

const deleteDetail = (index: number) => {
  body.value.details.splice(index, 1)
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
    body.value = setNullToEmptyDeep(body.value)
    await axios.put(`/DeliveryOrderItem/${deliveryOrder.value.id}/container/${container.value.id}/open`, body.value)

    emits('update:refresh')
    router.push(`/delivery-order-item/${id.value}`)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (container.value.id) {
    body.value.containerId = container.value.id
    body.value.deliveryOrderId = deliveryOrderStore.deliveryOrder.id
    body.value.fillStatus = container.value.fillStatus
  }
})
watch(() => container.value, () => {
  body.value.containerId = container.value.id
  body.value.deliveryOrderId = deliveryOrderStore.deliveryOrder.id
  body.value.fillStatus = container.value.fillStatus
})
watch(() => deliveryOrderStore.openContainerDialog, () => {
  // reset form
  if (!deliveryOrderStore.openContainerDialog) {
    body.value = {
      fillStatus: 1,
      deliveryOrderId: '',
      containerId: '',
      details: [],
    }
  }
})

const getDeliveryOrder = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrder/${id.value}`)

    deliveryOrder.value = data.result

    deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const panels = ref(0)
enum Tabs {
  Cars,
  Goods,
}
const selectedTab = ref<Tabs>(Tabs.Cars)

const selectedDetials = computed(() => {
  if (selectedTab.value === Tabs.Cars)
    return body.value.details.filter(detail => detail.car)
  else
    return body.value.details.filter(detail => detail.goods)
})

const addDetial = () => {
  if (selectedTab.value === Tabs.Cars)
    addCar()
  else
    addGoods()
}

onMounted(() => {
  if (isNullOrUndefined(deliveryOrder.value))
    getDeliveryOrder()
  console.log('container', container.value)

  if (isEmpty(container.value.id))
    router.push(`/delivery-order-item/${id.value}`)
})
</script>

<template>
  <VCard
    :loading="isLoading"
    class="transparent"
    flat
  >
    <VCardTitle class="d-flex align-center ">
      <span class="text-h4">
        تفريغ حاوية
      </span>

      <VRadioGroup
        v-model="body.fillStatus"
        class="mr-10"
        dir="ltr"
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
      <div class="d-flex justify-end gap-2">
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
        <!--
          <VBtn
          color="warning"
          @click="addCar"
          >
          <VIcon>mdi-car</VIcon>
          اضافة سيارة
          </VBtn>
        -->
        <VBtn
          color="secondary"
          :disabled="body.details.length < 1"
          @click="postData"
        >
          <VIcon>mdi-plus</VIcon>
          تفريغ الحاوية
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText class="position-relative">
      <VTabs
        v-model="selectedTab"
        align-tabs="center"
        class="do-tabs my-5 "
        height="60px"
        fixed-tabs
      >
        <VTab>
          السيارات
        </VTab>
        <VTab>
          البضائع
        </VTab>
      </VTabs>
      <h3
        v-if="body.details.length == 0"
        class="text-h5 text-center mb-10 mt-16"
      >
        يجب اضافة بضاعة او سيارة لتفريغ الحاوية
      </h3>
      <VForm ref="form">
        <VExpansionPanels>
          <VExpansionPanel
            v-for="(detail, i) in (selectedDetials)"
            :key="selectedTab === Tabs.Cars ? `car${i}` : `goods${i}`"
            :value="selectedTab === Tabs.Cars ? `car${i}` : `goods${i}`"
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
            <VExpansionPanelText class="my-2">
              <CarForm
                v-if="body.details[i].car != null"
                v-model="body.details[i]"
              />
              <GoodsForm
                v-if="body.details[i].goods != null"
                v-model="body.details[i]"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VForm>
    </VCardText>
  </VCard>
</template>
