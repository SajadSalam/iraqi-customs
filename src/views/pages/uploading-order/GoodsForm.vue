<script lang="ts" setup>
import type { Good } from './types'
import { requiredValidator } from '@/@core/utils/validators'

interface Props {
  modelValue: Good
}
const props = defineProps<Props>()
const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: Good) => emits('update:model-value', value),
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <AppSelectField
        v-model="modelValue.goodTypeId"
        :rules="[requiredValidator]"
        label="نوع البضاعة"
        item-label="name"
        item-value="id"
        get-url="/GoodsTypes"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.number"
        label="رقم البوليصة"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <CustomRadios
        v-model:selected-radio="modelValue.isNational"
        :radio-content="[{ title: 'نعم', value: true }, { title: 'لا', value: false }]"
        label="منتج وطني"
        :grid-column="{ cols: '12', sm: '3' }"
      />
    </VCol>
    <!-- weight -->
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.weight"
        label="وزن البضاعة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <!-- size -->
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.size"
        label="حجم البضاعة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <!-- quantity -->
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.quantity"
        label="الكمية"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppTextField
        v-model="modelValue.customerInfo"
        label="معلومات المستفيد"
      />
    </VCol>
    <!-- goodsDetails -->
    <VCol cols="12">
      <AppTextarea
        v-model="modelValue.goodsDetails"
        label="تفاصيل البضاعة"
      />
    </VCol>
  </VRow>
</template>
