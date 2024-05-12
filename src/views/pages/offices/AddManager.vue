<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useTableStore } from '@/stores/AppTableStore'
import { useOfficeStore } from '@/stores/OfficeStore'
import axios from '@axios'

const tableStore = useTableStore()
const officeStore = useOfficeStore()
const isDialogOpen = computed(() => officeStore.isAddManeger)
const officeId = computed(() => officeStore.dataManeger)
const managerId = ref()

const isLoading = ref(false)

const saveManager = async () => {
  try {
    await axios.patch(`/Office/${officeId.value.id}/manager/${managerId.value}`)
    isLoading.value = true
    tableStore.setRefresh(true)
    officeStore.setAddManeger(false, '')
    toast.success('تم الحفظ بنجاح')
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
    v-model="isDialogOpen"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          اضافة مدير للمكتب
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="officeStore.setAddManeger(false, '')"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex align-center gap-5">
          <AppSelectField
            v-model="managerId"
            label="اختر المدير"
            get-url="/User?generalRoleId=6"
            item-label="fullName"
            item-value="id"
            outlined
          />
          <VBtn
            class="mt-5"
            color="primary"
            :loading="isLoading"
            @click="saveManager"
          >
            اضافة المدير
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
