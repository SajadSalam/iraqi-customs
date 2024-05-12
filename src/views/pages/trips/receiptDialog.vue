<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const tripStore = useTripStore()

const submit = async () => {
  try {
    await axios.put(`/BillFreely/${tripStore.trip.id}/recalculate`)
    emits('refresh')
    tripStore.setReceiptDialog(false)
    toast.success('تم احتساب الفاتورة بنجاح')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <VDialog
    v-model="tripStore.receiptDialog"
    max-width="800"
    persistent
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">احتساب الفاتورة</span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setReceiptDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <h1 class="text-h4">
          هل انت متأكد من اعادة احتساب الفاتورة؟
        </h1>
        <div class=" mt-3">
          <VBtn
            block
            @click="submit"
          >
            احتساب
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
