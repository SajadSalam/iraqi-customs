<script setup lang="ts">
import type { GoodTypeFiltersType } from './types'

const emit = defineEmits(['update:filters'])

const modelValue = ref<GoodTypeFiltersType>({
  policaNumber: null,
  goodsTypeId: null,
})

onMounted(() => {
  emit('update:filters', modelValue.value)
})
watchDeep(() => modelValue.value, () => {
  emit('update:filters', modelValue.value)
})
</script>

<template>
  <!-- make it all apptextField -->
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
    <AppSelectField
      v-model="modelValue.goodsTypeId"
      label="نوع البضاعة"
      get-url="/goodstypes"
      item-label="name"
      item-value="id"
      clearable
      fetch-on-search
      search-key="name"
    />
  </VCol>
</template>
