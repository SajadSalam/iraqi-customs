<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import { useManifestStore } from '@/stores/ManifestStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])

const tableStore = useTableStore()

const ManifestStore = useManifestStore()
const isDialogOpen = computed(() => ManifestStore.goodTypeDialog)
const isLoading = ref(false)
const selectedGoodType = ref(null)

const updateGoodType = async () => {
  try {
    isLoading.value = true
    await axios.patch('/Manifests/Goods', {
      goodsIds: [ManifestStore.dataGoodType],
      goodTypeId: selectedGoodType.value,
    })
    emits('refresh')
    tableStore.setRefresh(true)
    ManifestStore.setGoodTypeDialog(false)
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
    width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          نوع البضاعة
          <VChip
            color="primary"
            text-color="white"
            class="ml-2"
          >
            تحديث
          </VChip>
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="ManifestStore.setGoodTypeDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <AppSelectField
          v-model="selectedGoodType"
          get-url="/GoodsTypes"
          label="نوع البضاعة"
          item-label="name"
          item-value="id"
          outlined
          class="mb-2"
        />
        <div class="d-flex justify-end">
          <VBtn
            color="primary"
            @click="updateGoodType"
          >
            <VIcon class="ml-2">
              mdi-check
            </VIcon>
            تحديث
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
