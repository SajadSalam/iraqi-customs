<script setup lang="ts">
import { VCheckbox, VCol } from 'vuetify/lib/components/index.mjs'
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

const isGoods = ref(false)

watch(isGoods, val => {
  if (val)
    body.value!.car!.vinNo = null
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VCheckbox
        v-model="isGoods"
        label="هل السيارة معدات ؟"
      />
    </VCol>
    <VCol
      v-if="!isGoods"
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.vinNo"
        label="رقم الشاصي"
      />
    </VCol>

    <VCol
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.carBrand"
        label="توع السيارة"
        :rules="[requiredValidator]"
      />
    </VCol>

    <VCol
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.carModel"
        label="موديل السيارة"
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
          size="small"
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
          size="small"
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
    <VCol
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.number"
        label="رقم البوليصة"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.carType"
        label="براند السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="2"
    >
      <AppTextField
        v-model="body!.car.carColor"
        label="لون السيارة"
      />
    </VCol>

    <VCol
      cols="12"
      md="3"
    >
      <AppTextField
        v-model="body!.car.carDetails"
        label="تفاصيل السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="2"
    >
      <AppTextField
        v-model="body!.car.weight"
        label="وزن السيارة"
      />
    </VCol>
    <VCol
      cols="12"
      md="2"
    >
      <AppTextField
        v-model="body!.car.size"
        label="حجم السيارة"
      />
    </VCol>
  </VRow>
</template>
