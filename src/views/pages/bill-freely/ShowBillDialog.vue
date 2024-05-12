<script lang="ts" setup>
import { useBillFreelyStore } from '@/stores/BillFreelyStore'
import AddInvoice from '@/views/pages/delivery-order/AddInvoice.vue'
import axios from '@axios'

const route = useRoute()
const id = computed(() => route.params.id)
const bill = ref(null)
const isLoading = ref(true)
const BillFreelyStore = useBillFreelyStore()
const invoices = ref<any[]>([])

const getBillFreelyById = async () => {
  isLoading.value = true
  console.log(BillFreelyStore.billData.id, 'id')
  try {
    const { data } = await axios.get(`/BillFreely/${BillFreelyStore.billData.id}`)

    bill.value = data.result
    BillFreelyStore.setBillFreey(bill.value)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const fetchData = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/deliveryOrder/${id.value}/invoice`)
    if (data.result == null) {
      invoices.value = []

      return
    }
    invoices.value[0] = data.result
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

// onMounted(() => {
//   getBillFreelyById()
//   fetchData()
// })
watch (() => BillFreelyStore.billData.id, () => {
  getBillFreelyById()
})

const headers = [
  {
    key: 'number',
    label: 'العدد',
  },
  {
    key: 'operations',
    label: 'العملية',
  },
  {
    key: 'listNo',
    label: 'رقم الصادر',
  },
  {
    key: 'listDate',
    label: 'تاريخ الفاتورة',
  },

  {
    key: 'totalPrice',
    label: 'السعر الكلي',
  },
  {
    key: 'raiyaPrice',
    label: 'نسبة الادارة الالكترونية',
  },
]
</script>

<template>
  <VDialog
    v-model="BillFreelyStore.showBillDetialsDialog"
    persistent
    max-width="950"
  >
    <div v-if="!isLoading">
      <VCard
        flat
        class="my-3"
      >
        <VCardTitle class="d-flex align-center justify-space-between">
          <VBtn
            variant="text"
            color="error"
            @click="BillFreelyStore.setBillDetailsDialog(false)"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
          <span class="headline">تفاصيل الفاتورة</span>
        </VCardTitle>
        <VCardText>
          <div class="d-flex justify-start py-5 gap-3">
            <h3 class="text-center">
              رقم الفاتورة
              <br>
              {{ bill.number }}
            </h3>
            <h3 class="text-center">
              رقم الفاتورة
              <br>
              {{ bill.number }}
            </h3>
          </div>
        </VCardText>
        <StaticTable
          class="mt-5"
          :headers="headers"
          :loading="isLoading"
          :data="invoices"
        >
          <template #operations="{ item }">
            {{ item.operations.map(v => v.operationName).join(', ') }}
          </template>
        </StaticTable>
        <AddInvoice @refresh="fetchData" />
      </vcard>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center"
    >
      <VProgressCircular
        indeterminate
        size="164"
        color="primary"
      />
    </div>
  </VDialog>
</template>
