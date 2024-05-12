<script setup lang="ts">
import type { Customer, Detail } from './types'
import { phoneNumValidator, requiredValidator } from '@/@core/utils/validators'

interface Props {
  modelValue?: Detail | null
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const body = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const togglenNewCustomer = () => {
  if (body.value!.customer) {
    body.value!.customer = null
  }
  else {
    body.value!.customer = {
      fullname: '',
      phoneNumber: '',
    } as Customer
  }
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <AppSelectField
        v-model="body!.goods.goodTypeId"
        :rules="[requiredValidator]"
        label="نوع البضاعة"
        item-label="name"
        item-value="id"
        get-url="/GoodsTypes"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppTextField
        v-model="body!.goods.number"
        label="رقم البوليصة"
      />
    </VCol>
    <!-- weight -->
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="body!.goods.weight"
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
        v-model="body!.goods.size"
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
        v-model="body!.goods.quantity"
        label="الكمية"
        :rules="[requiredValidator]"
      />
    </VCol>
    <!-- goodsDetails -->
    <VCol cols="12">
      <AppTextField
        v-model="body!.goods.goodsDetails"
        label="تفاصيل البضاعة"
      />
    </VCol>
    <VCol
      v-if="body?.customer == null"
      cols="12"
    >
      <div class="d-flex align-center">
        <AppSelectField
          v-model="body!.customerId"
          :rules="[requiredValidator]"
          label="المستفيد"
          item-label="fullname"
          item-value="id"
          get-url="/Customers"
        />
        <VBtn
          color="primary"
          class="mt-5 mx-2 py-0"
          icon
          variant="tonal"
          @click="togglenNewCustomer"
        >
          <VIcon>
            {{ body!.customer != null ? 'mdi-close' : 'mdi-plus' }}
          </VIcon>
        </VBtn>
      </div>
    </VCol>
    <VCol
      v-if="body?.customer != null"
      cols="12"
      md="6"
    >
      <AppTextField
        v-model="body!.customer.fullname"
        label="اسم المستفيد"
      />
    </VCol>
    <VCol
      v-if="body?.customer != null"
      cols="12"
      md="6"
    >
      <div class="d-flex align-center">
        <AppTextField
          v-model="body!.customer.phoneNumber"
          label="رقم الهاتف"
          :rules="[phoneNumValidator]"
        />
        <VBtn
          color="primary"
          class="mt-5 mx-2 py-0"
          icon
          variant="tonal"
          @click="togglenNewCustomer"
        >
          <VIcon>
            {{ body!.customer != null ? 'mdi-close' : 'mdi-plus' }}
          </VIcon>
        </VBtn>
      </div>
    </VCol>
    <VCol cols="12">
      <VCheckbox
        v-model="body!.isWaiver"
        label="هو تنازل ؟"
      />
    </VCol>
  </VRow>
</template>
