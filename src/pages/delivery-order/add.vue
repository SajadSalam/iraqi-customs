<script lang="ts" setup>
import DeliveryOrderFrom from '@/views/pages/delivery-order/DeliveryOrderForm.vue'
import type { Body } from '@/views/pages/delivery-order/types'

const body = ref<Body>({
  number: null,
  customerId: null,
  customerAssigneeId: null,
  agentId: null,
  tripPortTerminalId: null,
  isExport: false,
  isCorrectName: false,
  officeId: null,
  commissionerDirector: '',
  deliveryDate: new Date().toISOString().substring(0, 10),
})
</script>

<template>
  <div>
    <DeliveryOrderFrom v-model:body="body" />
  </div>
</template>
