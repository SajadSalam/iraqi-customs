<script setup lang="ts">
import { VForm } from 'vuetify/components'
import FormCard from './form-card.vue'
import type { Company } from './types'

const props = defineProps<{
  body: Company
  formRef: VForm | null
}>()

const emits = defineEmits<{
  (e: 'update:body', value: Company): void
  (e: 'update:formRef', value: VForm): void
}>()

const body = computed({
  get: () => props.body,
  set: (value: Company) => emits('update:body', value),
})

const formRef = computed({
  get: () => props.formRef,
  set: (value: VForm) => emits('update:formRef', value),
})
</script>

<template>
  <VForm ref="formRef">
    <div class="d-flex flex-column gap-3">
      <FormCard title="المعلومات الأساسية">
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.nameAr"
              label="اسم الشركة بالعربي"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.nameEn"
              label="اسم الشركة بالانجليزي"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.url"
              label="رابط الموقع الالكتروني"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="المعلومات التجارية">
        <VRow>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.taxNumber"
              label="الرقم الضريبي"
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.issuer"
              label="جهة الاصدار"
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.chamberNumber"
              label="رقم هوية غرفة التجارة"
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <AppDatePicker
              v-model="body.chamberDate"
              label="تاريخ الهوية التخصصية"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="معلومات الموقع">
        <VRow>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.branch"
              label="الفرع"
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.governorate"
              label="المحافظة"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.mahala"
              label="المحلة"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.zqaq"
              label="الزقاق"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="body.dar"
              label="الدار"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="معلومات النشاط">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.agentName"
              label="اسم الوكيل"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.activityType"
              label="نوع النشاط"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="الوثائق الرسمية">
        <AppFileUploader
          v-model="body.documents"
          multiple
          label="أي وثيقة رسمية"
        />
      </FormCard>
    </div>
  </VForm>
</template>
