<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { VAlert, VIcon, VSpacer } from 'vuetify/lib/components/index.mjs'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const DeliveryOrderStore = useDeliveryOrderStore()

// interface body {
//   payType: number | null
//   payDate: number | null
// }

const body = ref({
  payType: null,

  // payDate: null,
})

const submit = async () => {
  try {
    await axios.put(`/DeliveryOrder/${DeliveryOrderStore.deliveryOrder.id}/pay`, {

    }, {
      params: {
        payType: body.value.payType,
      },
    })
    DeliveryOrderStore.setPayDeliveryDialog(false)
    emits('refresh')
    toast.success('تم دفع الفاتورة بنجاح')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <VDialog
    v-model="DeliveryOrderStore.payDeliveryDialog"
    max-width="800"
    persistent
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">  دفع الفاتورة امر التسليم </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="DeliveryOrderStore.setPayDeliveryDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <AppSelectField
          v-model="body.payType"
          class="my-3"
          label="نوع الدفع"
          :items="PayTypeEnum"
          item-label="arName"
          item-value="value"
        />
        <VAlert
          color="info"
          variant="tonal"
          class="border rounded"
        >
          بعد الدفع لا يمكن التراجع عن العملية وسيكون بأمكانك طباعة أمر التسليم
        </VAlert>
        <!--
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
        -->
      </VCardText>
      <VCardActions class="mx-2">
        <VSpacer />
        <VBtn
          color="primary"
          variant="elevated"
          @click="submit"
        >
          <VIcon class="mx-2">
            mdi-check-all
          </VIcon>
          تأكيد ودفع فاتورة أمر التسليم
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
