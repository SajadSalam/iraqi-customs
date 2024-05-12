<script lang="ts" setup>
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

interface Props {
  clearance: ClearanceDetails
}
const props = defineProps<Props>()
const clearance = computed<ClearanceDetails>(() => props.clearance)
</script>

<template>
  <FormCard title="المعلومات المخول">
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          اسم المستورد الرباعي
        </p>
        <span>
          {{ clearance.certificate?.customer?.ceo?.fullName }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          اسم الوزارة
        </p>
        <span>
          وزارة النقل
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          اسم الجهة
        </p>
        <span>
          الشركة العامة لموانئ العراق
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          العنوان
        </p>
        <span>
          {{ clearance.certificate?.customer?.ceo?.governorate }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          التموينية
        </p>
        <span>
          -
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          رقم البطاقة الوطنية
        </p>
        <span>
          {{ clearance.certificate?.customer?.ceo?.passportNumber }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          رقم الهاتف
        </p>
        <span dir="ltr">
          {{ clearance.certificate?.customer?.ceo?.phoneNumber }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <p class="label-p">
          الرقم الضريبي
        </p>
        <span>
          {{ clearance.certificate?.customer?.company?.taxNumber }}
        </span>
      </VCol>
    </VRow>
  </FormCard>
</template>
