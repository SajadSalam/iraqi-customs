<script setup lang="ts">
import { VForm } from 'vuetify/components'
import FormCard from './form-card.vue'
import type { Ceo } from './types'
import { requiredValidator } from '@/@core/utils/validators'

const props = defineProps<{
  body: Ceo
  formRef: VForm | null
}>()

const emits = defineEmits<{
  (e: 'update:body', value: Ceo): void
  (e: 'update:formRef', value: VForm): void
}>()

const body = computed({
  get: () => props.body,
  set: (value: Ceo) => emits('update:body', value),
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
            md="6"
          >
            <CustomRadios
              v-model:selected-radio="body.isApplicationNew"
              label="هل الطلب جديد؟"
              :radio-content="[{ title: 'نعم', value: true }, { title: 'لا', value: false }]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <CustomRadios
              v-model:selected-radio="body.isCeoForeigner"
              label="هل المدير المفوض اجنبي؟"
              :radio-content="[{ title: 'نعم', value: true }, { title: 'لا', value: false }]"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="المعلومات الشخصية">
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.fullName"
              label="الاسم الكامل"
              :rules="[requiredValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.fullNameEn"
              label="الاسم الانكليزي"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.motherName"
              label="اسم الام"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.country"
              label="الدولة"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.phoneNumber"
              label="رقم الهاتف"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppFileUploader
              v-model="body.image"
              label="صورة الهوية"
            />
          </VCol>
        </VRow>
      </FormCard>
      <FormCard title="معلومات السكن">
        <VRow>
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
      <FormCard title="معلومات الأحوال المدنية (أو الجواز السفر للأجانب)">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.passportNumber"
              label="رقم الأحوال المدنية (أو جواز السفر)"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.passportDate"
              label="تاريخ الأحوال المدنية (أو جواز السفر)"
              placeholder="يوم/شهر/سنة"
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
    <VForm />
  </vform>
</template>
