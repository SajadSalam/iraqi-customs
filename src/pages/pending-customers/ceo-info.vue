<script lang="ts" setup>
import type { Ceo } from './types'
import { formatDate } from '@/@core/utils/formatters'
import { baseURL } from '@/plugins/sw-axios'
import FormCard from '@/views/landing-page/application-form/form-card.vue'

defineProps<{ ceo?: Ceo }>()
</script>

<template>
  <div
    v-if="ceo"
    class="d-flex flex-column gap-3"
  >
    <FormCard title="المعلومات الأساسية">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p>هل الطلب جديد؟</p>
          {{ ceo.isApplicationNew ? 'نعم' : 'لا' }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p>هل المدير المفوض اجنبي؟</p>
          {{ ceo.isCeoForeigner ? 'نعم' : 'لا' }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="المعلومات الشخصية">
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <p>الاسم الكامل</p>
          {{ ceo.fullName }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p>الاسم الانكليزي</p>
          {{ ceo.fullNameEn }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p>اسم الام</p>
          {{ ceo.motherName }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p>الدولة</p>
          {{ ceo.country }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p>رقم الهاتف</p>
          {{ ceo.phoneNumber }}
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <VBtn
            :href="baseURL + ceo.image"
            target="_blank"
            variant="outlined"
          >
            <VIcon>mdi-eye</VIcon>
            صورة الهوية
          </VBtn>
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات السكن">
      <VRow>
        <VCol
          cols="12"
          md="3"
        >
          <p>المحافظة</p>
          {{ ceo.governorate }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>المحلة</p>
          {{ ceo.mahala }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>الزقاق</p>
          {{ ceo.zqaq }}
        </VCol>

        <VCol
          cols="12"
          md="3"
        >
          <p>الدار</p>
          {{ ceo.dar }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="معلومات الأحوال المدنية (أو الجواز السفر للأجانب)">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <p>رقم الأحوال المدنية (أو جواز السفر)</p>
          {{ ceo.passportNumber }}
        </VCol>

        <VCol
          cols="12"
          md="6"
        >
          <p>تاريخ الأحوال المدنية (أو جواز السفر)</p>
          {{ formatDate(ceo.passportDate) }}
        </VCol>
      </VRow>
    </FormCard>
    <FormCard title="الوثائق الرسمية">
      <VBtn
        v-for="document in ceo?.documents"
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
