<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { payTypes } from '@/constants/enums'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const tripStore = useTripStore()
interface body {
  payType: number | null
  payDate: number | null
}

const body = ref({
  payType: null,
  payDate: null,
})

const submit = async () => {
  try {
    await axios.put(`/BillFreely/${tripStore.bill.id}/pay`, body.value)
    tripStore.setPayDialog(false)
    emits('refresh')
    toast.success('تم احتساب الفاتورة بنجاح')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <VDialog
    v-model="tripStore.payDialog"
    max-width="800"
    persistent
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">دفع الفاتورة</span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setPayDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.payDate"
              label="تاريخ الدفع"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppAutocomplete
              v-model="body.payType"
              label="نوع الدفع"
              item-title="arName"
              item-value="value"
              :items="payTypes"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VBtn
          block
          variant="elevated"
          color="primary"
          @click="submit"
        >
          دفع
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
