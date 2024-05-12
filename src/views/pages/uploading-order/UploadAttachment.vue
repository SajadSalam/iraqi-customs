<script setup lang="ts">
import { toFormData } from 'axios'
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const deliveryOrderStore = useDeliveryOrderStore()

const isDialogOpen = computed({
  get() {
    return deliveryOrderStore.isUploadAttachmentDialogOpen
  },
  set(value) {
    deliveryOrderStore.setIsUploadAttachmentDialogOpen(value)
  },
})

const isLoading = ref(false)

const body = ref({
  file: null,
  deliveryOrderId: '',
})

const submit = async () => {
  if (!body.value.file)
    return
  isLoading.value = true
  try {
    body.value.deliveryOrderId = deliveryOrderStore.deliveryOrder.id

    const tempBody = { ...body.value }

    tempBody.file = tempBody!.file![0]

    const formData = toFormData(tempBody)

    await axios.post(`/DeliveryOrderItem/export/${deliveryOrderStore.deliveryOrder.id}/attachment`, formData)
    isDialogOpen.value = false
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="650"
    @click:outside="isDialogOpen = false"
  >
    <VCard class="pa-3">
      <VCardTitle class="d-flex">
        رفع مستند لأمر التصدير
        <VSpacer />
        <VIcon
          color="error"
          @click="isDialogOpen = false"
        >
          mdi-close
        </VIcon>
      </VCardTitle>
      <VCardText>
        <VForm>
          <VFileInput
            v-model="body.file"
            label="المستند"
          />
          <div class="d-flex mt-3 justify-end">
            <VBtn
              color="primary"
              :loading="isLoading"
              @click="submit"
            >
              <VIcon left>
                mdi-upload
              </VIcon>
              رفع المستند
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </vdialog>
</template>
