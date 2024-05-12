<script lang="ts" setup>
import { formatDate } from '@/@core/utils/formatters'
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

interface Props {
  clearance: ClearanceDetails
}
const props = defineProps<Props>()
const clearance = computed<ClearanceDetails>(() => props.clearance)
</script>

<template>
  <FormCard title="المعلومات العامة">
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          دائرة الاصدار
        </p>
        <span>
          كمارك مطار البصرة
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          رقم البيان (التصريحة)
        </p>
        <span>
          {{ clearance?.number }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          التسلسل الحدودي
        </p>
        <span>
          {{
            clearance?.number.toString().split('').sort(() => Math.random() - 0.5).join('')
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          التاريخ
        </p>
        <span>
          {{ formatDate(clearance?.creationDate) }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          اسم الموظف المختص
        </p>
        <span>
          {{ clearance?.employeeName }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          اسم الشخص الذي اخرج الاموال
        </p>
        <span>
          {{ clearance?.accountantName }}
        </span>
      </VCol>
    </VRow>
  </FormCard>
</template>
