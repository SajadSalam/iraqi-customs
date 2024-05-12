<script lang="ts" setup>
import type { Company } from './types'
import { baseURL } from '@/plugins/sw-axios'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

defineProps<{ company?: Company }>()
</script>

<template>
  <div
    v-if="company"
    class="d-flex flex-column gap-3"
  >
    <FormCard title="المعلومات الأساسية">
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <p>اسم الشركة بالعربي</p>
          {{ company.nameAr }}
        </VCol>

        <VCol
          cols="12"
          md="4"
        >
          <p>اسم الشركة بالانجليزي</p>
          {{ company.nameEn }}
        </VCol>

        <VCol
          cols="12"
          md="4"
        >
          <p>رابط الموقع الالكتروني</p>
          {{ company.url }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="المعلومات التجارية">
      <VRow>
        <VCol
          cols="12"
          md="3"
        >
          <p>الرقم الضريبي</p>
          {{ company.taxNumber }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>جهة الاصدار</p>
          {{ company.issuer }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>رقم هوية غرفة التجارة</p>
          {{ company.chamberNumber }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>تاريخ الهوية التخصصية</p>
          {{ company.chamberDate }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات الموقع">
      <VRow>
        <VCol
          cols="12"
          md="3"
        >
          <p>الفرع</p>
          {{ company.branch }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>المحافظة</p>
          {{ company.governorate }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>المحلة</p>
          {{ company.mahala }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>الزقاق</p>
          {{ company.zqaq }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>الدار</p>
          {{ company.dar }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات النشاط">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p>اسم الوكيل</p>
          {{ company.agentName }}
        </VCol>

        <VCol
          cols="12"
          md="6"
        >
          <p>نوع النشاط</p>
          {{ company.activityType }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="الوثائق الرسمية">
      <VBtn
        v-for="document in company?.documents"
        :key="document"
        :href="baseURL + document"
        target="_blank"
        variant="outlined"
      >
        <VIcon>mdi-eye</VIcon>
        عرض الوثيقة
      </VBtn>
    </FormCard>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  color: rgb(var(--v-theme-secondary));
  font-weight: bold;
}
</style>
