<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useTableStore } from '@/stores/AppTableStore'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const deliveryOrderStore = useDeliveryOrderStore()
const tableStore = useTableStore()

const submit = async () => {
  try {
    console.log(deliveryOrderStore.cancelId)

    await axios.delete(`/DeliveryOrder/${deliveryOrderStore.cancelId}/cancel`)
    await tableStore.setRefresh(true)
    deliveryOrderStore.setCancelDialog(false)
    emits('refresh')
    toast.success('تم اتلاف الامر بنجاح')
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <VDialog
    v-model="deliveryOrderStore.cancelDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline"> اتلاف الامر </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="deliveryOrderStore.setCancelDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-start">
          <span class="text-h5">هل انت متأكد من اتلاف الامر ؟</span>
        </div>
        <div class="mt-3">
          <VBtn
            block
            @click="submit"
          >
            موافقة
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
