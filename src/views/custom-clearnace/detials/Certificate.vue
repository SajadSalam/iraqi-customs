<script lang="ts" setup>
import type { Certificate } from '@/pages/custom-clearnace/types'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

interface Props {
  data: Certificate
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <FormCard title="معلومات المستورد">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            أسم المدير المفوض
          </p>
          <span>
            {{ data.customer?.ceo?.fullName }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            أسم الشركة
          </p>
          <span>
            {{ data.customer?.company?.nameAr }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            رقم الهاتف
          </p>
          <span>
            {{ data.customer?.ceo?.phoneNumber }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            أسم الام
          </p>
          <span>
            {{ data.customer?.ceo?.motherName }}
          </span>
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات الاجازة">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            أسم المادة
          </p>
          <span>
            {{ data.itemName }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            الرمز المنسق
          </p>
          <span>
            {{ data.number }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            الكمية الاصلية
          </p>
          <span>
            {{ data.quantity }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            الكمية الحالية
          </p>
          <span>
            {{ data.usedQuantity }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="12"
        >
          <p class="label-p">
            الوصف
          </p>
          <span>
            {{ data.description }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            السعر بالدينار
          </p>
          <span>
            {{ data.iqdPrice }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            السعر بالدولار
          </p>
          <span>
            {{ data.usdPrice }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            اسم المصنع
          </p>
          <span>
            مصنع الافق
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            أسم الشركة الموردة
          </p>
          <span>
            شركة السنابل للتجارة العامة
          </span>
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات الطلب">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            بلد المنشأ
          </p>
          <span>
            الهند
          </span>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <p class="label-p">
            المنفذ
          </p>
          <span>
            ميناء ام قصر
          </span>
        </VCol>
      </VRow>
    </FormCard>
  </div>
</template>
