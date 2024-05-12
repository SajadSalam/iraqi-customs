<script setup lang="ts">
import type { CarFiltersType } from './types'

const emit = defineEmits(['update:filters'])

const modelValue = ref<CarFiltersType>({
  policaNumber: null,
  carWeightFrom: null,
  carWeightTo: null,
  carBillLading: null,
  carType: null,
  carBrand: null,
  carModel: null,
  carColor: null,
  carYear: null,
})

onMounted(() => {
  emit('update:filters', modelValue.value)
})
watchDeep(() => modelValue.value, () => {
  emit('update:filters', modelValue.value)
})
</script>

<template>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.policaNumber"
      clearable
      label="رقم البوليصة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carWeightFrom"
      clearable
      label="وزن السيارة من"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carWeightTo"
      clearable
      label="وزن السيارة إلى"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carBillLading"
      clearable
      label="رقم بوليصة الشحن"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carType"
      clearable
      label="نوع السيارة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carBrand"
      clearable
      label="نوع السيارة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carModel"
      clearable
      label="موديل السيارة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carColor"
      clearable
      label="لون السيارة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.carYear"
      clearable
      label="سنة الصنع"
    />
  </VCol>
</template>
