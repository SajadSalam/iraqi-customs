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
    await axios.delete(`/DeliveryOrder/${deliveryOrderStore.dropId}/drop`)
    await tableStore.setRefresh(true)
    deliveryOrderStore.setDropDialog(false)
    emits('refresh')
    toast.success('تمت العملية بنجاح')
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <VDialog
    v-model="deliveryOrderStore.dropDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline"> تسقيط الامر </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="deliveryOrderStore.setDropDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-start">
          <span class="text-h5">هل انت متأكد من تسقيط الامر ؟</span>
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
