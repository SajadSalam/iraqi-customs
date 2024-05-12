<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const tripStore = useTripStore()
const tableStore = useTableStore()

const submit = async () => {
  try {
    await axios.put(`/Trip/${tripStore.acceptId}/status/${2}`)
    await tableStore.setRefresh(true)
    tripStore.setCancelDialog(false)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <VDialog
    v-model="tripStore.acceptDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">الموافقة على الرحلة </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setCancelDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-start">
          <span class="text-h5">هل انت متأكد من الموافقة على  الرحلة ؟</span>
        </div>
        <div class=" mt-3">
          <VBtn
            block
            @click="submit"
          >
            موافقة
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
