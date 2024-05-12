<script setup lang="ts">
import InfoLabel from '../delivery-order/InfoLabel.vue'
import { useOfficeStore } from '@/stores/OfficeStore'
import axios from '@axios'

const officeStore = useOfficeStore()

const isDialogOpen = computed(() => officeStore.isOfficeOpen)
const terminals = ref([])
const officeId = computed(() => officeStore.dataDialog.id)
const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true

  const { data } = await axios.get(`/Office/${officeId.value}/terminal`)

  terminals.value = data.result.data
  isLoading.value = false
}

const terminalId = ref(null)

const deleteAgent = async (id: string) => {
  try {
    isLoading.value = true
    await axios.delete(`/Office/${officeId.value}/terminal/${id}`)
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const addAgent = async () => {
  try {
    isLoading.value = true
    await axios.post(`Office/${officeId.value}/terminal/${terminalId.value}`)
    terminalId.value = null
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(isDialogOpen, val => {
  if (val)
    fetchData()
})
</script>

<template>
  <VDialog
    v-model="officeStore.isOfficeOpen"
    persistent
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline"> اضافة ارصفة للمكتب </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="officeStore.setDataDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
          اغلاق
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow v-if="!isLoading">
          <VCol cols="12">
            <div class="d-flex align-center gap-5">
              <AppSelectField
                v-model:model-value="terminalId"
                get-url="DepartmentTerminal"
                item-label="name"
                item-value="id"
                label="الرصيف"
              />
              <VBtn
                class="mt-5"
                color="success"
                @click="addAgent"
              >
                <VIcon>mdi-plus</VIcon>
                اضافة رصيف للباخرة
              </VBtn>
            </div>
          </VCol>
          <VCol cols="12">
            <h4 class="text-h4">
              ارصفة المكتب
            </h4>
            <p
              v-if="terminals.length === 0"
              class="text-caption mt-3"
            >
              لا يوجد ارصفة لهذا المكتب
            </p>
          </VCol>
          <VCol
            v-for="agent in terminals"
            :key="agent.id"
            cols="12"
            md="6"
          >
            <VCard outlined>
              <VCardTitle class="pa-5 d-flex align-center">
                <InfoLabel
                  label="الرصيف"
                  :value="agent.name"
                  icon="tabler-user-plus"
                />
                <VSpacer />
                <VBtn
                  color="error"
                  variant="tonal"
                  @click="deleteAgent(agent.id)"
                >
                  <VIcon> mdi-delete </VIcon>
                </VBtn>
              </VCardTitle>
            </VCard>
          </VCol>
        </VRow>
        <div
          v-else
          class="d-flex justify-center"
        >
          <VProgressCircular
            indeterminate
            size="100"
            color="primary"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
