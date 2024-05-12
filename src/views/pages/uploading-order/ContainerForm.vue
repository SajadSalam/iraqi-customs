<script lang="ts" setup>
import CarForm from './CarForm.vue'
import GoodsForm from './GoodsForm.vue'
import type { Container } from './types'
import { requiredValidator } from '@/@core/utils/validators'

interface Props {
  modelValue: Container
  isManifest?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['update:model-value'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: Container) => emits('update:model-value', value),
})

const addCar = () => {
  modelValue.value.cars?.push({
    number: '',
    size: 0,
    weight: 0,
    carType: '',
    carBrand: '',
    carModel: '',
    carColor: '',
    vinNo: '',
    carDetails: '',
    isDamage: false,
    entryDate: new Date(),
  })
}

const addGoods = () => {
  modelValue.value.goods?.unshift({
    goodTypeId: '',
    number: '',
    size: 0,
    weight: 0,
    quantity: 0,
    goodsDetails: '',
    isNational: false,
    customerInfo: '',
  })
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <CustomRadios
        v-model:selected-radio="modelValue.isEmpty"
        :radio-content="[{ title: 'فارغة', value: true }, { title: 'مملوءة', value: false }]"
        label="طبيعة الحاوية"
        :grid-column="{ cols: '12', sm: '4' }"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppSelectField
        v-model:model-value="modelValue.containerId"
        :rules="[requiredValidator]"
        label="الحاوية"
        item-label="number"
        item-value="id"
        fetch-on-search
        search-key="number"
        get-url="/ContainerInfo"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AppTextField
        v-model="modelValue!.number"
        label="رقم البوليصة"
      />
    </VCol>
    <VCol
      v-if="!isManifest"
      cols="12"
      md="4"
    >
      <AppDatePicker
        v-model="modelValue.entryDate"
        :rules="[requiredValidator]"
        label="تاريخ الدخول"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
      />
    </VCol>
    <VCol
      v-if="!modelValue.isEmpty && !isManifest"

      cols="12"
      md="4"
    >
      <AppDatePicker
        v-model="modelValue.loadingDate"
        label="تاريخ الملئ"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
      />
    </VCol>
    <VCol
      cols="12"
     :md="isManifest ? 6 : 4"
    >
      <CustomRadios
        v-model:selected-radio="modelValue.containerState"
        :radio-content="[{ title: 'خطرة', value: 1 }, { title: 'غير خطرة', value: 2 }]"
        label="حالة الحاوية"
        :grid-column="{ cols: '12', sm: '4' }"
      />
    </VCol>
    <VCol cols="12" :md="isManifest ? 6 : 12">
      <AppTextField
        v-model="modelValue.customerInfo"
        label="اسم المستفيد"
      />
    </VCol>
    <VCol cols="12">
      <AppTextarea
        v-model="modelValue.goodsDetails"
        label="تفاصيل البضاعة"
      />
    </VCol>
    <VCol
      v-if="!modelValue.isEmpty && !isManifest"
      cols="12"
    >
      <h6 class="text-h4 text-primary">
        السيارات
      </h6>
      <span
        v-if="modelValue.cars?.length === 0"
        class="mt-2 text-h6"
      >
        لا يوجد سيارات مضافة
      </span>
      <VExpansionPanels class="mt-3">
        <VExpansionPanel
          v-for="(detail, i) in modelValue.cars"
          :key="i"
        >
          <VExpansionPanelTitle>
            <template #default="{ expanded }">
              <VRow no-gutters>
                <VCol
                  cols="4"
                  class="d-flex justify-start align-center"
                >
                  <VIcon
                    size="30"
                    color="primary"
                    icon="tabler-car"
                  />
                  <span :class="`font-weight-bold mx-2 ${expanded ? 'text-primary' : ''}`">
                    السيارات
                    :
                    {{ i + 1 }}
                  </span>
                </VCol>
                <VCol
                  cols="4"
                  class="text-grey"
                />
                <VCol
                  cols="4"
                  class="d-flex justify-end"
                >
                  <VBtn
                    color="error"
                    variant="text"
                    @click.stop="modelValue.cars?.splice(i, 1)"
                  >
                    <VIcon>mdi-delete</VIcon>
                    حذف
                  </VBtn>
                </VCol>
              </VRow>
            </template>
          </VExpansionPanelTitle>
          <VExpansionPanelText class="my-2">
            <CarForm v-model="modelValue.cars[i]" />
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
    <VCol
      v-if="!modelValue.isEmpty && !isManifest"
      cols="12"
    >
      <h6 class="text-h4 text-primary">
        البضائع
      </h6>
      <span
        v-if="modelValue.goods?.length === 0"
        class="mt-2 text-h6"
      >
        لا يوجد بضائع مضافة
      </span>
      <VExpansionPanels class="mt-3">
        <VExpansionPanel
          v-for="(detail, i) in modelValue.goods"
          :key="i"
        >
          <VExpansionPanelTitle>
            <template #default="{ expanded }">
              <VRow no-gutters>
                <VCol
                  cols="4"
                  class="d-flex justify-start align-center"
                >
                  <VIcon
                    size="30"
                    color="primary"
                    icon="tabler-car"
                  />
                  <span :class="`font-weight-bold mx-2 ${expanded ? 'text-primary' : ''}`">
                    البضائع
                    :
                    {{ i + 1 }}
                  </span>
                </VCol>
                <VCol
                  cols="4"
                  class="text-grey"
                />
                <VCol
                  cols="4"
                  class="d-flex justify-end"
                >
                  <VBtn
                    color="error"
                    variant="text"
                    @click.stop="modelValue.goods?.splice(i, 1)"
                  >
                    <VIcon>mdi-delete</VIcon>
                    حذف
                  </VBtn>
                </VCol>
              </VRow>
            </template>
          </VExpansionPanelTitle>
          <VExpansionPanelText class="my-2">
            <GoodsForm v-model="modelValue.goods[i]" />
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <div
    v-if="!isManifest"
    class="d-flex justify-end align-end mt-4"
  >
    <VBtn
      color="primary"
      variant="elevated"
      class="mx-3"
      :disabled="modelValue.isEmpty"
      @click="addCar"
    >
      <VIcon size="30">
        tabler-car
      </VIcon>
      إضافة سيارات
    </VBtn>
    <VBtn
      color="warning"
      variant="elevated"
      :disabled="modelValue.isEmpty"
      @click="addGoods"
    >
      <VIcon size="30">
        tabler-package
      </VIcon>
      إضافة بضائع
    </VBtn>
  </div>
</template>
