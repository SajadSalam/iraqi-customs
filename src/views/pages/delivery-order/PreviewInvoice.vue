<script setup lang="ts">
import { VAlert, VCol, VIcon, VSpacer } from 'vuetify/lib/components/index.mjs'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const emits = defineEmits(['refresh'])

const deliveryOrderStore = useDeliveryOrderStore()

const isDialogOpen = computed({
  get: () => deliveryOrderStore.isPreviewInvoiceDialogOpen,
  set: value => deliveryOrderStore.setPreivewInvoice(value),
})

const deliveryOrder = computed(() => deliveryOrderStore.deliveryOrder)
const isLoading = ref(false)

const previewData = ref({
  operations: [],
  totalPrice: 0,
  raiyaPrice: 0,
})

const fetchPreivew = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.post(`/DeliveryOrder/${deliveryOrder.value.id}/invoice/preview`)

    previewData.value = data.result
  }
  catch (error) {
    console.error(error)
    isDialogOpen.value = false
  }
  finally {
    isLoading.value = false
  }
}

const isConfirmPrint = ref(false)
const listDate = ref(new Date())

watch(isDialogOpen, value => {
  if (value) {
    isConfirmPrint.value = false
    fetchPreivew()
  }
})

const operationsHeaders = [
  {
    label: 'العملية',
    key: 'operationName',
  },
  {
    label: 'الكمية',
    key: 'count',
  },
  {
    label: 'السعر',
    key: 'price',
  },
  {
    label: 'السعر الكلي',
    key: 'totalPrice',
  },
  {
    label: 'نسبة الادارة الالكترونية',
    key: 'raiyaPrice',
  },
  {
    label: 'المجموع',
    key: 'total',
  },

]

const printInvoice = async () => {
  if (!isConfirmPrint.value) {
    isConfirmPrint.value = true
  }
  else {
    try {
      isLoading.value = true
      await axios.post('/DeliveryOrder/invoice', {
        deliveryOrderId: deliveryOrder.value.id,
        listDate: listDate.value,
      })
      isDialogOpen.value = false
      emits('refresh')
      window.open(`/print/delivery-order-invoice/${deliveryOrder.value.id}`)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    persistent
    width="950"
  >
    <VCard>
      <VCardTitle class="d-flex">
        معاينة الفاتورة
        <VSpacer />
        <VBtn
          icon
          color="error"
          class="rounded-circle"
          size="small"
          @click="isDialogOpen = false"
        >
          <VIcon>
            mdi-close
          </VIcon>
        </VBtn>
      </VCardTitle>
      <div
        v-if="isLoading"
        class="d-flex justify-center my-10"
      >
        <VProgressCircular
          indeterminate
          color="primary"
          size="75"
        />
      </div>
      <VCardText v-else>
        <StaticTable
          :headers="operationsHeaders"
          :data="previewData.operations"
        >
          <template #total="{ item }">
            {{ (item.totalPrice + item.raiyaPrice).toLocaleString() }}
          </template>
        </StaticTable>
        <VDivider class="my-2" />
        <VAlert
          v-if="isConfirmPrint"
          color="error"
          variant="tonal"
          class="border my-3"
        >
          <VIcon size="20">
            mdi-alert-circle-outline
          </VIcon>
          بعد طباعة الفاتورة لا يمكن الرجوع عن العملية وستفقد القدرة على تعديل جميع بيانات امر التسليم
        </VAlert>
        <VRow
          align="center"
          no-gutters
        >
          <VCol
            cols="12"
            md="2"
          >
            <p>
              <span class="font-weight-bold">
                السعر الكلي:
              </span>
              {{ previewData.totalPrice.toLocaleString() }}
            </p>
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <p>
              <span class="font-weight-bold">
                نسبة الادارة الالكترونية:
              </span>
              {{ previewData.raiyaPrice.toLocaleString() }}
            </p>
          </VCol>
          <VSpacer />
          <VCol
            v-if="isConfirmPrint"
            cols="12"
            md="2"
          >
            <div class="d-flex justify-end mx-2 font-weight-medium">
              تاريخ القائمة:
            </div>
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <AppDatePicker
              v-if="isConfirmPrint"
              v-model="listDate"
              placeholder="تاريخ الفاتورة"
              class="ml-4"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <VBtn
              :color="isConfirmPrint ? 'error' : 'primary'"
              @click="printInvoice"
            >
              <VIcon>
                mdi-printer
              </VIcon>
              {{ isConfirmPrint ? 'تأكيد' : 'طباعة' }}
              الفاتورة
            </VBtn>
          </VCol>
        </VRow>
        <!--

          <div class="d-flex align-center gap-3">
          <VBtn
          :color="isConfirmPrint ? 'error' : 'primary'"
          @click="printInvoice"
          >
          <VIcon>
          mdi-printer
          </VIcon>
          طباعة الفاتورة
          </VBtn>
          </div>
        -->
      </VCardText>
    </VCard>
  </VDialog>
</template>
