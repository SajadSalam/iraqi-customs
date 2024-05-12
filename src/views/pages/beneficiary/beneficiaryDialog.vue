<script setup lang="ts">
import { dateGTEValidator, dateLTEValidator, phoneNumValidator } from '@/@core/utils/validators'
import { useTableStore } from '@/stores/AppTableStore'
import { useBeneficiaryStore } from '@/stores/beneficiaryStore'
import axios from '@axios'

const emits = defineEmits(['update:refresh'])
const tableStore = useTableStore()
const routes = useRoute()
const beneficiaryStore = useBeneficiaryStore()

const body = ref({
  fullname: '',
  phoneNumber: '',
  customerType: '',
  isGovernorate: '',
  address: '',
})

const isLoading = ref(false)
const form = ref<VForm | null>(null)

const post = async () => {
  try {
    const validate = await form.value?.validate()
    if (!validate.valid)
      return
    isLoading.value = true
    body.value.tripId = tripStore.trip.id
    await axios.post('/tripPort', body.value)
    emits('update:refresh', true)
    beneficiaryStore.setTripPortDialog(false)
  }
  catch (e) {
    console.log(e)

    dateGTEValidator(e, 'arrivalDate')
    dateLTEValidator(e, 'entryDate')
  }
  finally {
    isLoading.value = false
  }
}

const beneficiary = computed(() => {
  return beneficiaryStore.trip
})

const customerType = [
  {
    name: 'SteamshipAgent',
    value: 1,
  },
  {
    name: 'JointOperatingCompany',
    value: 2,
  },
  {
    name: 'ShippingCompany',
    value: 3,
  },
  {
    name: 'Beneficiary',
    value: 4,
  },
  {
    name: 'Insurer',
    value: 5,
  },
  {
    name: 'Authorized',
    value: 6,
  },
  {
    name: 'Other',
    value: 7,
  },
]
</script>

<template>
  <VDialog
    v-model="tripStore.tripPortDialog"
    persistent
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          اضافة مستفيد
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          size="small"
          @click="tripStore.setTripPortDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="form"
          :disabled="isLoading"
        >
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <AppSelectField
                v-model:model-value="body.fullname"
                label="الاسم"
                item-label="name"
                item-value="id"
                get-url="/port"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model:model-value="body.phoneNumber"
                label="رقم الهاتف"
                :rules="[phoneNumValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelectField
                v-model:model-value="body.customerType"
                label="نوع المستفيد"
                item-label="name"
                item-value="id"
                get-url="/port"
              />
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-3">
            <VBtn  @click="post">
              اضافة
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
