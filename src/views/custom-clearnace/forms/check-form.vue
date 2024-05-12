<script lang="ts" setup>
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import { useCustomClearanceService } from '@/pages/custom-clearnace/utils'
import ChangeStatusDialog from '@/views/custom-clearnace/detials/clearance/change-status-dialog.vue'

interface Props {
  detials: ClearanceDetails
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const detials = computed(() => props.detials)
const customClearanceService = useCustomClearanceService()

const body = ref({
  products: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      checkReason: '',
      checkType: 0,
    },
  ],
})

const router = useRouter()

const submit = async () => {
  try {
    await customClearanceService.changeStatus(detials.value.id, 'check', body.value)
    router.push('/custom-clearnace')
  }
  catch (error) {
    console.error(error)
  }
}

const products = computed(() => detials.value.products)

const fitProducts = () => {
  products.value?.forEach(product => {
    body.value.products.push({
      id: product.id,
      checkReason: '',
      checkType: 0,
    })
  })
}

const modelValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
    if (value)
      fitProducts()
  },
})
</script>

<template>
  <ChangeStatusDialog
    v-model="modelValue"
    title="نقل التصريحة للكاشف"
    @submitted="submit"
  >
    <VRow
      v-for="(product, index) in body.products"
      :key="product.id"
    >
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="body.products[index].id"
          label="رقم البند"
          disabled
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <AppSelectField
          v-model="body.products[index].checkType"
          label="نوع الفحص"
          :items="[
            { name: 'سونار ويدوي', id: 0 },
            { name: 'سونار', id: 1 },
            { name: 'يدوي', id: 2 },
            { name: 'لا شيء', id: 3 },
          ]"
          item-label="name"
          item-value="id"
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="body.products[index].checkReason"
          label="سبب الفحص"
        />
      </VCol>
    </VRow>
  </ChangeStatusDialog>
</template>
