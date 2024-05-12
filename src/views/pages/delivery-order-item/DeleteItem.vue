<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useTableStore } from '@/stores/AppTableStore'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const deliveryOrderStore = useDeliveryOrderStore()
const tableStore = useTableStore()
const isDialogOpen = computed(() => deliveryOrderStore.isDialogDelete)
const dataGood = computed(() => deliveryOrderStore.dataGoods)
const id = computed(() => deliveryOrderStore.delId)
const itemID = computed (() => deliveryOrderStore.goodId)

const isLoading = ref(false)

const deleteItem = async () => {
  isLoading.value = true
  try {
    if (dataGood.value === 2)
      await axios.delete(`/DeliveryOrderItem/${id.value}/container/${itemID.value}`)

    else if (dataGood.value === 1)
      await axios.delete(`/DeliveryOrderItem/${id.value}/car/${itemID.value}`)

    else if (dataGood.value === 3)
      await axios.delete(`/DeliveryOrderItem/${id.value}/goods/${itemID.value}`)

    toast.success('تم الحذف بنجاح')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    tableStore.setRefresh(true)
    deliveryOrderStore.setDeletDialog(false, '')
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    persistent
    max-width="300"
  >
    <VCard>
      <VCardTitle class="d-flex align-center pa-3">
        <h5 class="title">
          حذف البيانات
        </h5>
      </VCardTitle>
      <VCardText>
        <span>هل أنت متأكد من حذف البيانات؟</span>
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="elevated"

          @click="deliveryOrderStore.setDeletDialog(false, '')"
        >
          إلغاء
        </VBtn>
        <VBtn
          color="error"
          variant="elevated"
          @click="deleteItem"
        >
          حذف
        </VBtn>
      </vcardactions>
    </VCard>
  </VDialog>
</template>
