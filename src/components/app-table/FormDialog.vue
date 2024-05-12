<script setup lang="ts">
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'

const props = defineProps<Props>()

const emit = defineEmits(['save'])

const tableStore = useTableStore()
interface Props {
  urls: ApiUrls
  formData?: boolean
}
const fields = computed(() => tableStore.createFields)
const initalData = computed(() => tableStore.initalData)
const isFormDialogOpen = computed(() => tableStore.isFormDialogOpen)
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <VDialog
    v-model="isFormDialogOpen"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">{{ tableStore.dialogTitle }}</span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          size="small"
          @click="tableStore.setFormDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <Suspense>
          <AppForm
            :submit-url="tableStore.editId ? tableStore.urls?.update : tableStore.urls?.create"
            :fields="fields"
            :inital-data="initalData"
            :edit-id="tableStore.editId"
            :form-data="formData"
            @cancel="tableStore.setFormDialog(false)"
            @save="emit('save'); tableStore.setFormDialog(false)"
          />
        </Suspense>
      </VCardText>
    </VCard>
  </VDialog>
</template>
