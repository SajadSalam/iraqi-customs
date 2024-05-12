<script lang="ts" setup>
import DeliveryOrderFrom from '@/views/pages/delivery-order/DeliveryOrderForm.vue'
import type { Body } from '@/views/pages/delivery-order/types'
import axios from '@axios'

const route = useRoute()
interface Props {
  body: Body
}

const body = ref<Body>({
  customerId: null,
  customerAssigneeId: null,
  agentId: null,
  tripPortTerminalId: null,
  deliveryDate: null,
  isCorrectName: false,
  commissionerDirector: '',
})

const customer = ref({})

onMounted(async () => {
  const id = route.params.id
  if (id) {
    const { data } = await axios.get(`/deliveryOrder/${id}`)
    const result = data.result

    customer.value = result.customer
    Object.keys(body.value).forEach((key: string) => {
      if (result[key])
        body.value[key] = result[key]

      if (key.endsWith('Id')) {
        const keyName = key.replace('Id', '')
        if (result[keyName.replace('Id', '')])
          body.value[key] = result[keyName.replace('Id', '')].id
      }
    })
  }
})
</script>

<template>
  <DeliveryOrderFrom
    v-model:body="body"
    :customer="customer"
  />
</template>
