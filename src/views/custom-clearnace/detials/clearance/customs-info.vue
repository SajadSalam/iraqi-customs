<script lang="ts" setup>
import { formatDate, numberToArabicWords } from '@/@core/utils/formatters'
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

interface Props {
  clearance: ClearanceDetails
  deliveryOrder: any
  deliveryItems: any
}
const props = defineProps<Props>()
const clearance = computed<ClearanceDetails>(() => props.clearance)
const deliveryOrder = computed(() => props.deliveryOrder)
const deliveryItems = computed(() => props.deliveryItems)

const goodsDataToString = computed(() => {
  let str = ''
  if (deliveryItems.value.cars.length > 0)
    str += `${deliveryItems.value.cars.length} سيارة`

  if (deliveryItems.value.containers.length > 0)
    str += `, ${deliveryItems.value.containers.length} حاوية`

  if (deliveryItems.value.goods.length > 0)
    str += `, ${deliveryItems.value.goods.length} بضائع`

  return str
})

const totalGoods = computed<number>(() => {
  return deliveryItems.value.cars.length + deliveryItems.value.containers.length + deliveryItems.value.goods.length
})
</script>

<template>
  <FormCard title="المعلومات الكمرك">
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          عدد القطع و اوصافها
        </p>
        <span>
          {{ goodsDataToString }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          مجموع القطع كتابة
        </p>
        <span>
          {{ numberToArabicWords(totalGoods) }}
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          رقم امر التسليم
        </p>
        <span>
          {{ deliveryOrder.number }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          التاريخ
        </p>
        <span>
          {{ formatDate(deliveryOrder.deliveryDate) }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          رقم المنفست
        </p>
        <span>
          {{
            // shuffle deliveryOrder.number
            deliveryOrder.number?.toString().split('').sort(() => Math.random() - 0.5).join('')
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          التاريخ
        </p>
        <span>
          {{ formatDate(deliveryOrder.deliveryDate) }}
        </span>
      </VCol>
    </VRow>
  </FormCard>
</template>
