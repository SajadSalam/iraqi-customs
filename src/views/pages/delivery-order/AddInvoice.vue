<script lang="ts" setup>
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const route = useRoute()
const id = computed(() => route.params.id)
const deliveryOrderStore = useDeliveryOrderStore()
const isLoading = ref(false)
const form = ref(null)

const body = ref({
  deliveryOrderId: id.value,
  listDate: '',
})

const isAdditionalInvoice = computed(() => deliveryOrderStore.isAdditionalInvoice)

const postData = async () => {
  try {
    isLoading.value = true
    if (isAdditionalInvoice.value)
      await axios.post('/deliveryOrder/AdditionalInvoice', body.value)

    else
      await axios.post('/deliveryOrder/invoice', body.value)

    // await axios.post('/deliveryOrder/invoice', body.value)

    emits('refresh')
    deliveryOrderStore.setInvoiceDialog(false)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="deliveryOrderStore.invoiceDialog"
    persistent
    max-width="950"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center pa-3">
        <span class="text-h4">
          اضافة فاتورة
          {{ isAdditionalInvoice ? 'ملحقة' : '' }}
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="deliveryOrderStore.setInvoiceDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppDatePicker
                v-model="body.listDate"
                label="تاريخ القائمة"
                type="time"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
              />
            </VCol>

            <VCol cols="12">
              <div class="d-flex justify-end">
                <VBtn
                  class="mx-2"
                  color="error"
                  variant="outlined"
                  @click="deliveryOrderStore.setInvoiceDialog(false)"
                >
                  إلغاء
                </VBtn>
                <VBtn
                  color="primary"
                  variant="outlined"
                  @click="postData"
                >
                  إضافة
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
