import axiosIns from '@/plugins/axios';
<script lang="ts" setup>
import { VSpacer } from 'vuetify/lib/components/index.mjs'
import { Tabs } from '@/views/pages/delivery-order-item/types'
import axios from '@axios'

interface Props {
  modelValue: boolean
  item: any
  onlyDescription: boolean
  type: Tabs
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:refresh'])
const type = computed(() => props.type)
const onlyDescription = computed(() => props.onlyDescription)
const route = useRoute()
const id = computed(() => route.params.id)
const item = computed(() => props.item)
const formRef = ref<VForm>()
const isLoading = ref(false)
const isContainer = ref(false)

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

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
  deliveryOrderId?: string
}

const request = ref<Body>({
  containersId: [],
  carsId: [],
  goodsId: [],
  description: '',
  quantity: 0,
  weight: 0,
  size: 0,
  isWaver: false,
  isConfirm: false,
  isCorrectName: false,
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
  isWaver: false,
  isConfirm: false,
  isCorrectName: false,
  deliveryOrderId: null,
})

function onSubmit() {
  formRef.value.validate().then(({ valid: isValid }: { valid: boolean }) => {
    if (isValid) {
      isLoading.value = true
      if (onlyDescription.value) {
        request.value.weight = null
        request.value.quantity = null
        request.value.isConfirm = null
        request.value.isCorrectName = null
        request.value.size = null
        request.value.isWaver = null
      }

      // set null if the value is the same as the initial value
      Object.keys(request.value).forEach(key => {
        // skip ids
        if (['containersId', 'carsId', 'goodsId'].includes(key))
          return
        if (request.value[key as keyof typeof request.value] === initalRequest.value[key as keyof typeof initalRequest.value])
          request.value[key as keyof typeof request.value] = null
      })
      console.log(request.value)
      request.value.deliveryOrderId = id.value
      axios
        .patch('/DeliveryOrderItem/update', request.value)
        .then(() => {
          modelValue.value = false
          emit('update:refresh')
        }).finally(() => isLoading.value = false,
        )
    }
  })
}
watch(() => item.value, item => {
  console.log(item)

  Object.keys(request.value).forEach(key => {
    if (item[key])
      request.value[key as keyof typeof request.value] = item[key]
  })
  request.value.description = item.goodsDetails || ''
  request.value.carsId = []
  request.value.containersId = []
  request.value.goodsId = []
  if (type.value === Tabs.Containers)
    request.value.containersId = [item.id]

  else if (type.value === Tabs.Cars)
    request.value.carsId = [item.id]

  else
    request.value.goodsId = [item.id]

  initalRequest.value = { ...request.value }
})
</script>

<template>
  <VDialog
    v-model="modelValue"
    max-width="650"
  >
    <VCard class="elevation-0 ">
      <VCardTitle class="d-flex align-center">
        {{ onlyDescription ? 'تعديل وصف البضاعة' : 'تعديل البيانات' }}
        <VSpacer />
        <VBtn
          variant="text"
          icon="mdi-close"
          color="error"
          @click="modelValue = false"
        />
      </VCardTitle>
      <VCardText>
        <VForm
          ref="formRef"
          @submit.prevent="onSubmit"
        >
          <VRow>
            <VCol
              v-if=" !onlyDescription"
              cols="12"
            >
              <VLabel class="mb-1">
                العدد
              </VLabel>
              <VTextField
                v-model="request.quantity"
                type="number"
              />
            </VCol>
            <VCol
              v-if="!onlyDescription"
              cols="12"
            >
              <VLabel class="mb-1">
                الوزن
              </VLabel>
              <VTextField
                v-model="request.weight"
                type="number"
              />
            </VCol>
            <VCol
              v-if="!onlyDescription"
              cols="12"
            >
              <VLabel class="mb-1">
                الحجم
              </VLabel>
              <VTextField
                v-model="request.size"
                type="number"
              />
            </VCol>
            <VCol
              v-if="!onlyDescription"
              cols="12"
              md="4"
            >
              <VLabel class="mb-1">
                تنازل
              </VLabel>
              <VSwitch
                v-model="request.isWaver"
                type="number"
              />
            </VCol>
            <VCol
              v-if="!onlyDescription"
              cols="12"
              md="4"
            >
              <VLabel class="mb-1">
                تصحيح اسم
              </VLabel>
              <VSwitch
                v-model="request.isCorrectName"
                type="number"
              />
            </VCol>
            <VCol
              v-if="!onlyDescription"
              cols="12"
              md="4"
            >
              <VLabel class="mb-1">
                تأكيد منفست
              </VLabel>
              <VSwitch
                v-model="request.isConfirm"
                type="number"
              />
            </VCol>
            <VCol cols="12">
              <VLabel class="mb-1">
                وصف البضاعة
              </VLabel>
              <VTextarea v-model="request.description" />
            </VCol>

            <VCol
              cols="12"
              class="d-flex"
            >
              <VSpacer />
              <VBtn
                color="primary"
                type="submit"
                prepend-icon="tabler-device-floppy"
                :loading="isLoading"
              >
                حفظ
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
