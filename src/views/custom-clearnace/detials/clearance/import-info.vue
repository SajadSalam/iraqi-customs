<script lang="ts" setup>
import { formatDate } from '@/@core/utils/formatters'
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

interface Props {
  clearance: ClearanceDetails
}
const props = defineProps<Props>()
const clearance = computed<ClearanceDetails>(() => props.clearance)
const certificate = computed(() => clearance.value.certificate)
</script>

<template>
  <FormCard title="المعلومات العامة">
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          السنة
        </p>
        <span>
          {{
            certificate.creationDate.split('-')[0]
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          النوع
        </p>
        <span>
          {{
            certificate.itemName
          }}
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          الشهر
        </p>
        <span>
          {{
            new Intl.DateTimeFormat('ar-EG', { month: 'long' }).format(new Date(certificate.creationDate))
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          التسلسل
        </p>
        <span>
          {{
            certificate.number
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          رمز الجهة المستوردة
        </p>
        <span>-</span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          القيد
        </p>
        <span>
          324342
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          نقطة الدخول و رقمها
        </p>
        <span>-</span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          الطريق
        </p>
        <span>-</span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          التاريخ
        </p>
        <span>
          {{
            formatDate(certificate.creationDate)
          }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          رقم إجازة استيراد
        </p>
        <span>
          {{
            certificate.number
          }}
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          بلد شحن البضاعة
        </p>
        <span>
          {{ certificate.address }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          قيمتها
        </p>
        <span>
          {{
            certificate.quantity
          }}
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          سعر الصرف
        </p>
        <span>
          {{ certificate.usdPrice }}
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          نوع العملة المدفوعة
        </p>
        <span>
          دينار
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          رقم الحالة
        </p>
        <span>
          1235
        </span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          طريقة التسديد
        </p>
        <span>
          الكتروني
        </span>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <p class="label-p">
          عائدية واسطة النقل
        </p>
        <span>-</span>
      </VCol>
      <VCol
        cols="12"
        md="6"
        label-p
      >
        <p class="label-p">
          تاريخ وصولها
        </p>
        <span>
          {{
            formatDate(certificate.creationDate)
          }}
        </span>
      </VCol>
    </VRow>
  </FormCard>
</template>
