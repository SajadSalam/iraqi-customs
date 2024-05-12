<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import { useEManifestStore } from '@/stores/EmanifestStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const EmanifestStore = useEManifestStore()
const tableStore = useTableStore()

const submit = async () => {
  try {
    await axios.put(`/Manifests/${EmanifestStore.manifest.id}/status/${2}`)
    await tableStore.setRefresh(true)
    EmanifestStore.setRecpictDialog(false)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <VDialog
    v-model="EmanifestStore.RecpictDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">الموافقة على رفع المنفيست </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="EmanifestStore.setRecpictDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-start">
          <span class="text-h5">هل انت متأكد من الموافقة على رفع المنفيست ؟</span>
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
