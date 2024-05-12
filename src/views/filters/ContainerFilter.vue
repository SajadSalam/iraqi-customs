<script setup lang="ts">
import type { ContainerFiltersType } from './types'
import { ContainerStateEnum, ContainerStatusEnum, ContainerTypeEnum } from '@/constants/enums'

const emit = defineEmits(['update:filters'])

const modelValue = ref<ContainerFiltersType>({
  policaNumber: null,
  containerNumber: null,
  containerSize: null,
  containerWeightFrom: null,
  containerWeightTo: null,
  containerType: null,
  containerState: null,
  fillStatus: null,
  containerLine: null,
})

const sendEvent = () => {
  emit('update:filters', modelValue.value)
}

onMounted(() => {
  sendEvent()
})

watchDeep(() => modelValue.value, () => {
  sendEvent()
})
</script>

<template>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      clearable
      v-model="modelValue.policaNumber"
      label="رقم البوليصة"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.containerNumber"
      clearable
      label="رقم الحاوية"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      clearable
      v-model="modelValue.containerSize"
      label="حجم الحاوية"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppAutocomplete
      v-model="modelValue.containerType"
      label="نوع الحاوية"
      :items="ContainerTypeEnum"
      item-title="arName"
      clearable
      item-value="value"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppAutocomplete
      v-model="modelValue.containerState"
      label="حالة الحاوية"
      :items="ContainerStateEnum"
      item-title="arName"
      clearable
      item-value="value"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppAutocomplete
      v-model="modelValue.fillStatus"
      label="حالة التفريغ"
      :items="ContainerStatusEnum"
      clearable
      item-title="arName"
      item-value="value"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.containerWeightFrom"
      clearable
      label="الوزن من"
    />
  </VCol>
  <VCol
    cols="12"
    md="3"
  >
    <AppTextField
      v-model="modelValue.containerWeightTo"
      clearable
      label="الوزن إلى"
    />
  </VCol>
</template>
