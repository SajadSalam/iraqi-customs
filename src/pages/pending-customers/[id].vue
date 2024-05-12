<script lang="ts" setup>
import CeoInfo from './ceo-info.vue'
import CertificateDialog from './certificate-dialog.vue'
import CompanyInfo from './company-info.vue'
import type { Customer } from './types'
import swAxios, { baseURL } from '@/plugins/sw-axios'

const customer = ref<Customer>({} as Customer)
const isLoading = ref(false)
const route = useRoute()

const fetchData = async () => {
  isLoading.value = true
  try {
    const { data } = await swAxios.get(`/customer/${route.params.id}`)

    customer.value = data
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

const tabs = [
  {
    title: 'معلومات الحساب',
  },
  {
    title: 'معلومات الشركة',
  },
]

const activeTab = ref(0)

onMounted(fetchData)

const documents = computed(() => {
  return (customer.value.ceo?.documents ?? []).concat(customer.value.company?.documents || []) || []
})

const isCertificateDialogOpen = ref(false)
</script>

<template>
  <div v-if="!isLoading">
    <VRow>
      <VCol
        cols="12"
        md="8"
      >
        <VRow class="mb-2">
          <VCol
            v-for="tab in tabs"
            :key="tab.title"
            cols="12"
            md="6"
          >
            <VBtn
              :color="activeTab === tabs.indexOf(tab) ? 'primary' : 'gray'"
              variant="outlined"
              block
              @click="activeTab = tabs.indexOf(tab)"
            >
              {{ tab.title }}
            </VBtn>
          </VCol>
        </VRow>
        <CeoInfo
          v-if="activeTab === 0"
          :ceo="customer.ceo"
        />
        <CompanyInfo
          v-else-if="activeTab === 1"
          :company="customer.company"
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <div class="d-flex mb-5">
          <VSpacer />
          <VBtn
            color="primary"
            rounded="xl"
            size="large"
            @click="isCertificateDialogOpen = true"
          >
            <VIcon
              size="25"
              class="ml-2"
            >
              mdi-certificate
            </VIcon>
            منح شهادة استيراد
          </VBtn>
        </div>
        <VCard
          flat
          class="bg-gradient-primary border-white"
        >
          <VCardTitle class="text-primary font-weight-bold my-3">
            الوثائق الرسمية
          </VCardTitle>
          <VDivider />
          <VCardText>
            <img
              v-for="document in documents"
              :key="document"
              :src="baseURL + document"
              class="document-img mb-2"
            >
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <CertificateDialog
      v-model:is-dialog-open="isCertificateDialogOpen"
      :customer-id="customer!.id"
    />
  </div>
  <div
    v-else
    class="d-flex justify-center align-center"
    style="height: 50vh;"
  >
    <VProgressCircular
      indeterminate
      color="primary"
      size="150"
    />
  </div>
</template>

<style lang="scss">
.document-img {
  width: 100%;
  height: 200px;
  border: 4px solid rgb(var(--v-theme-secondary));
  border-radius: 10px;
  object-fit: cover;
}
</style>
