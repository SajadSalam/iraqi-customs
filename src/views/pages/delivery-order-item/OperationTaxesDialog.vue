<script setup lang="ts">
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'

const deliveryOrderStore = useDeliveryOrderStore()

const isDialogOpen = computed(({
  get: () => deliveryOrderStore.isOperationTaxesDialogOpen,
  set: value => deliveryOrderStore.setOperationTaxes(null, value),
}))

const operationTaxes = computed(() => deliveryOrderStore.operationTaxes)

const states = [
  {
    name: 'CorrectName',
    value: 0,
    arName: 'تصحيح اسم',
    color: 'success',
  },
  {
    name: 'Confirm',
    value: 1,
    arName: 'تأكيد منفست',
    color: 'info',
  },
  {
    name: 'Waver',
    value: 2,
    arName: 'تنازل',
    color: 'warning',
  },
  {
    name: 'SplitPolica',
    value: 3,
    arName: 'فصل بوليصة',
    color: 'error',
  },
  {
    name: 'UpdateDetails',
    value: 4,
    arName: 'تحديث التفاصيل',
    color: 'purple',
  },
  {
    name: 'Update',
    value: 5,
    arName: 'تحديث عنصر',
    color: 'primary',
  },
  {
    name: 'NewItem',
    value: 6,
    arName: 'عنصر جديد',
    color: 'secondary',
  },
]

const findStatus = (status: number) => states.find(state => state.value === status)
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    width="500"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">العمليات</span>
        <VSpacer />
        <VBtn
          icon
          variant="text"
          color="error"
          @click="isDialogOpen = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VChip
          v-for="operation in operationTaxes"
          :key="operation.status"
          :color="findStatus(operation.status).color"
          size="large"
        >
          {{ findStatus(operation.status).arName }}
        </VChip>
      </VCardText>
    </VCard>
  </VDialog>
</template>
