<script setup lang="ts">
import type { VForm } from 'vuetify/components'
import { useApplicationService } from './application-form/application-service'
import CompanyForm from './application-form/company-form.vue'
import CustomerForm from './application-form/customer-form.vue'
import type { Body } from './application-form/types'
import UserCreationForm from './application-form/user-creation-form.vue'
import { useHomePage } from './utils'

const currentStep = ref(0)

const homePage = useHomePage()
const { changeRoute, Route, steps } = homePage
const customerFormRef = ref<VForm | null>(null)
const companyFormRef = ref<VForm | null>(null)
const userFormRef = ref<VForm | null>(null)

const applicationService = useApplicationService()

const body = ref<Body>({} as Body)

body.value = applicationService.initBody()

const nextStep = async () => {
  if (currentStep.value === 0) {
    const validate = await customerFormRef.value?.validate()

    if (validate?.valid)
      currentStep.value++
  }
  else if (currentStep.value === 1) {
    const validate = await companyFormRef.value?.validate()

    if (validate?.valid)
      currentStep.value++
  }
  else if (currentStep.value === 2) {
    await applicationService.saveApplication(body.value)
    changeRoute(Route.SuccessSection)
  }
}
</script>

<template>
  <VCard
    flat
    class="bg-gray  border-white  pa-5 mb-3"
  >
    <AppStepper
      v-model:current-step="currentStep"
      style="width: 100%;"
      :items="steps"
      direction="horizontal"
    />
  </VCard>
  <CustomerForm
    v-if="currentStep === 0"
    v-model:body="body.ceo"
    v-model:formRef="customerFormRef"
  />
  <CompanyForm
    v-if="currentStep === 1"
    v-model:body="body.company"
    v-model:formRef="companyFormRef"
  />
  <UserCreationForm
    v-if="currentStep === 2"
    v-model:body="body.user"
    v-model:formRef="userFormRef"
  />
  <div
    flat
    class="sticky-footer mx-5"
  >
    <VCardText>
      <div class="d-flex align-center justify-end">
        <VBtn
          color="error"
          class="mx-2"
          @click="currentStep === 0 ? changeRoute(Route.HomeSection) : currentStep--"
        >
          <VIcon>mdi-close</VIcon>
          {{ currentStep === 0 ? 'إلغاء' : 'رجوع' }}
        </VBtn>
        <VBtn
          color="primary"
          class="mx-2"
          @click="nextStep"
        >
          <VIcon class="ml-2">
            mdi-content-save
          </VIcon>
          حفظ
        </VBtn>
      </div>
    </VCardText>
  </div>
</template>
