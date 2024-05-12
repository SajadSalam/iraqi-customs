<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import axios from '@axios'

const emit = defineEmits(['success'])
const tableStore = useTableStore()
const isDialogOpen = computed(() => tableStore.isDeleteDialogOpen)
const isLoading = ref(false)

const deleteItem = async () => {
  try {
    isLoading.value = true
    await axios.delete(`${tableStore.urls?.delete}/${tableStore.deletedItemId}`)
    emit('success')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
    tableStore.setDeleteDialog(false)
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="400"
  >
    <VCard>
      <VCardTitle class="headline">
        هل انت متاكد من الحذف
      </VCardTitle>
      <VCardSubtitle>
        ستفقد البيانات نهائيا
      </VCardSubtitle>
      <VCardText>
        <div class="d-flex justify-end">
          <VBtn
            class="mx-2"
            color="primary"
            @click="tableStore.setDeleteDialog(false)"
          >
            الغاء
          </VBtn>
          <VBtn
            color="error"
            @click="deleteItem"
          >
            حذف
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </vdialog>
</template>
