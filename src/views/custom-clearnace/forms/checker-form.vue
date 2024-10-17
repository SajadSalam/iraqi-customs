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

  ],
})

const products = computed(() => detials.value.products)

const fitProducts = () => {
  body.value.products = []
  body.value.products.push({
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    identical: true,
    checkImages: [
    ],
    notIdenticalReason: '',
    grossweight: '',
    netweight: '',
    quantity: '10',
    description: 'فحص',
  })
}

onMounted(() => {
  fitProducts()
})

const router = useRouter()

const submit = async () => {
  try {
    await customClearanceService.changeStatus(detials.value.id, 'checker', body.value)
    router.push('/custom-clearnace')
  }
  catch (error) {
    console.error(error)
  }
}

const modelValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})

watch(modelValue, value => {
  if (value)
    fitProducts()
})
</script>

<template>
  <ChangeStatusDialog
    v-model="modelValue"
    title="مطابقة كشف وفحص البضاعة"
    @submitted="submit"
  >
    <VCard
      v-for="(product, index) in body.products"
      :key="index"
      class="pa-5"
    >
      <h2>
        {{ product.description }}
      </h2>
      <VRow>
        <VCol
          cols="12"
          md="3"
        >
          <AppTextField
            v-model="body.products[index].grossweight"
            label=" الوزن القائم (كغم)"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <AppTextField
            v-model="body.products[index].netweight"
            label="الوزن الصافي (كغم)"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <AppTextField
            v-model="body.products[index].quantity"
            label="الكمية / عدد الوحدات"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <CustomRadios
            v-model:selected-radio="body.products[index].identical"
            :grid-column="{
              cols: 6,
              md: 6,
            }"
            label="هل جميع البضاعة متطابقة"
            :radio-content="[{ title: 'نعم', value: true }, { title: 'لا', value: false }]"
          />
        </VCol>
        <VCol
          cols="12"
          md="12"
        >
          <AppFileUploader
            v-model="body.products[index].checkImages"
            label="صور الكشف"
            multiple
          />
        </VCol>
      </VRow>
    </VCard>
  </ChangeStatusDialog>
</template>
