<script setup lang="ts">
import { VForm } from 'vuetify/components'
import FormCard from './form-card.vue'
import type { User } from './types'
import { emailValidator, requiredValidator } from '@/@core/utils/validators'

const props = defineProps<{
  body: User
  formRef: VForm | null
}>()

const emits = defineEmits<{
  (e: 'update:body', value: User): void
  (e: 'update:formRef', value: VForm): void
}>()

const body = computed({
  get: () => props.body,
  set: (value: User) => emits('update:body', value),
})

const formRef = computed({
  get: () => props.formRef,
  set: (value: VForm) => emits('update:formRef', value),
})
</script>

<template>
  <VForm ref="formRef">
    <div class="d-flex flex-column gap-3">
      <FormCard title="المعلومات الحساب الإلكتروني">
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.email"
              label="البريد الالكتروني"
              :rules="[requiredValidator, emailValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppPasswordField
              v-model="body.password"
              label="كلمة المرور"
              :rules="[requiredValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppPasswordField
              v-model="body.password"
              label="تأكيد كلمة المرور"
              :rules="[requiredValidator, v => v === body.password || 'كلمة المرور غير متطابقة']"
            />
          </VCol>
        </VRow>
      </FormCard>
    </div>
  </VForm>
</template>
