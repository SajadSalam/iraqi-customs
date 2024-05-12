<script setup lang="ts">
import { typeStatus } from '@/constants/enums'
import axios from '@axios'

interface Props {
  containersIds: string[]
  cardsIds: string[]
  goodsIds: string[]
}
const props = defineProps<Props>()
const emits = defineEmits(['refresh'])
const route = useRoute()
const id = computed(() => route.params.id)
const containerIds = computed(() => props.containersIds)
const cardsIds = computed(() => props.cardsIds)
const goodsIds = computed(() => props.goodsIds)
interface Body {
  containersId: string[]
  carsId: string[]
  goodsId: string[]
  description: string | null
  quantity: number | null
  weight: number | null
  size: number | null
  isWaver: boolean | null
  isConfirm: boolean | null
  isCorrectName: boolean | null
  deliveryOrderId: string
}

const request = ref<Body>({
  containersId: [],
  carsId: [],
  goodsId: [],
  description: '',
  quantity: 0,
  weight: 0,
  size: 0,
  isWaver: null,
  isConfirm: null,
  isCorrectName: null,
  deliveryOrderId: id.value,
})

const initalRequest = ref<Body>({
  containersId: [],
  carsId: [],
  goodsId: [],
  description: '',
  quantity: 0,
  weight: 0,
  size: 0,
  isWaver: null,
  isConfirm: null,
  isCorrectName: null,
  deliveryOrderId: '',
})

const isAnySelected = computed(() => {
  return containerIds.value.length > 0 || cardsIds.value.length > 0 || goodsIds.value.length > 0
})

const selectedCount = computed(() => {
  return containerIds.value.length + cardsIds.value.length + goodsIds.value.length
})

const updateItems = async (type: 'isWaiver' | 'isCorrectName' | 'isConfirm') => {
  request.value[type] = true
  Object.keys(request.value).forEach(key => {
    if (['containersId', 'carsId', 'goodsId'].includes(key))
      return
    if (request.value[key as keyof typeof request.value] === initalRequest.value[key as keyof typeof initalRequest.value])
      request.value[key as keyof typeof request.value] = null
  })
  request.value.deliveryOrderId = id.value
  await axios.patch('/DeliveryOrderItem/update', request.value)
  emits('refresh')
}

const deleteItems = async () => {
  try {
    await axios.put(`/DeliveryOrderItem/${id.value}/delete-items`, {
      containersId: containerIds.value,
      carsId: cardsIds.value,
      goodsId: goodsIds.value,

    })
    emits('refresh')
  }
  catch (error) {
    console.error(error)
  }
}

watchDeep(props, () => {
  request.value.containersId = containerIds.value
  request.value.carsId = cardsIds.value
  request.value.goodsId = goodsIds.value
})

const updateTypeStatus = async (status: number) => {
  await axios.put('/Container/type-status', {
    ids: containerIds.value,
    typeStatus: status,
  })
  emits('refresh')
}

const router = useRouter()

const openContainers = () => {
  // deliveryOrderStore.setContainer(item)
  // deliveryOrderStore.setDeliveryOrder(deliveryOrder.value)

  // deliveryOrderStore.setOpenContainerDialog(true)
  router.push({
    name: 'delivery-order-item-containers-id',
    params: { id: id.value },
    query: {
      containersId: containerIds.value,
    },
  })
}
</script>

<template>
  <div v-if="isAnySelected">
    <p>
      تم تحديد
      <VChip
        color="info"
        class="mx-2"
      >
        {{ selectedCount }}
      </VChip>
      عنصر
    </p>
    <div class="d-flex align-center gap-3">
      مع التحديد:
      <VBtn
        color="info"
        @click="updateItems('isWaiver')"
      >
        تنازل
      </VBtn>
      <VBtn
        color="warning"
        @click="updateItems('isCorrectName')"
      >
        تصحيح اسم
      </VBtn>
      <VBtn
        color="success"
        @click="updateItems('isConfirm')"
      >
        تأكيد منفيست
      </VBtn>
      <VBtn
        color="info"
        @click="openContainers"
      >
        تفريع الحاويات
      </VBtn>
      <VBtn
        color="error"
        @click="deleteItems"
      >
        حذف
      </VBtn>
    </div>
    <div
      v-if="containerIds.length > 0"
      class="d-flex align-center gap-2 my-5"
    >
      حالة الحاوية:
      <VBtn
        v-for="status in typeStatus"
        :key="status.value"
        :color="status.color"
        @click="updateTypeStatus(status.value)"
      >
        {{ status.arName }}
      </VBtn>
    </div>
  </div>
</template>
