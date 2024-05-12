<script setup lang="ts">
import CarForm from './CarForm.vue'
import GoodsForm from './GoodsForm.vue'
import type { OpenContainerBody } from './types'
import axios from '@axios'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'

const emits = defineEmits(['update:refresh'])
const deliveryOrderStore = useDeliveryOrderStore()
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

const postData = async () => {
  const isValid = await form.value.validate()
  if (!isValid.valid)
    return

  isLoading.value = true
  try {
    await axios.put(`/DeliveryOrderItem/${deliveryOrderStore.deliveryOrder.id}/container/${container.value.id}/open`, body.value)

    deliveryOrderStore.setOpenContainerDialog(false)
    emits('update:refresh')
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

const panels = ref(0)
</script>

<template>
  <VDialog
    v-model="deliveryOrderStore.openContainerDialog"
    persistent
    max-width="950"
  >
    x
  </VDialog>
</template>
