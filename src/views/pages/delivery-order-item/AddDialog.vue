<script setup lang="ts">
import type { Tabs } from './types'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'

const deliveryOrderStore = useDeliveryOrderStore()

const selectedTab = computed<Tabs>({
  get() {
    return deliveryOrderStore.tab
  },
  set(value) {
    deliveryOrderStore.tab = value
  },
})

const isLoading = ref(false)
const data = ref([])

const fetchData = async () => {
  isLoading.value = true
  try {
    const res = await axios.get(`/deliveryOrderItem/${id.value}`)

    data.value = res.data.result
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
    v-model="deliveryOrderStore.addDialog"
    persistent
    max-width="950"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center pa-3">
        <span class="text-h4">
          اضافة
          <VChip
            class="text-h4"
            size="large"
          >
            {{ selectedTab === 0 ? 'حاويات' : selectedTab === 1 ? 'سيارات' : 'بضائع' }}
          </VChip>
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="deliveryOrderStore.setAddDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText />
    </VCard>
  </VDialog>
</template>
