<script lang="ts" setup>
import type { Car } from './types'
import { requiredValidator } from '@/@core/utils/validators'

interface Props {
  modelValue: Car
}
const props = defineProps<Props>()
const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: Car) => emits('update:model-value', value),
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.vinNo"
        label="رقم الشاصي"
        :rules="[requiredValidator]"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.carBrand"
        label="نوع السيارة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.carColor"
        label="لون السيارة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.carModel"
        label="موديل السيارة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.carDetails"
        label="تفاصيل السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.weight"
        label="وزن السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.size"
        label="حجم السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.carType"
        label="براند السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue.number"
        label="رقم البوليصة"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <CustomRadios
        v-model:selected-radio="modelValue.isDamage"
        :radio-content="[{ title: 'خطرة', value: true }, { title: 'غير خطرة', value: false }]"
        label="حالة السيارة"
        :grid-column="{ cols: '12', sm: '1' }"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppTextField
        v-model="modelValue.customerInfo"
        label="معلومات المستفيد"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppDatePicker
        v-model="modelValue.entryDate"
        :rules="[requiredValidator]"
        label="تاريخ الدخول"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
      />
    </VCol>
  </VRow>
</template>
