<script setup lang="ts">
import { useDeliveryOrderStore } from '@/stores/DeliveryOrder'
import axios from '@axios'

const emits = defineEmits(['refresh'])

const deliveryOrderStore = useDeliveryOrderStore()

const isDialogOpen = computed({
  get: () => deliveryOrderStore.isUpdateNoteDialogOpen,
  set: value => deliveryOrderStore.setIsUpdateNoteDialogOpen(value),
})

const deliveryOrder = computed(() => deliveryOrderStore.deliveryOrder)
const isLoading = ref(false)

const body = ref({
  note: '',
})

const submit = async () => {
  try {
    isLoading.value = true
    await axios.put(`/deliveryOrder/${deliveryOrder.value.id}/note`, body.value)
    isLoading.value = false
    isDialogOpen.value = false
    emits('refresh')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    width="650"
    persistent
  >
    <VCard>
      <VCardTitle class="d-flex">
        تعديل الملاحظات
        <VSpacer />
        <VBtn
          icon
          color="error"
          class="rounded-circle"
          @click="isDialogOpen = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="submit">
          <AppTextarea
            v-model="body.note"
            label="الملاحظات"
          />
          <div class="d-flex mt-3">
            <VSpacer />
            <VBtn
              type="submit"
              color="primary"
              :loading="isLoading"
            >
              حفظ
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
