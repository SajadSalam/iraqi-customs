<script setup lang="ts">
import InfoLabel from '../delivery-order/InfoLabel.vue'
import { useTableStore } from '@/stores/AppTableStore'
import { useShipStore } from '@/stores/ShipsStore'
import axios from '@axios'

const shipStore = useShipStore()
const tableStore = useTableStore()
const isDialogOpen = computed(() => shipStore.isAddUserShipOpen)
const agents = ref([])
const shipId = computed(() => shipStore.ship.id)
const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true

  const { data } = await axios.get(`/Ship/${shipId.value}/steamship-agents`)

  agents.value = data.result.data
  isLoading.value = false
}

const agentId = ref(null)

const deleteAgent = async (id: string) => {
  try {
    isLoading.value = true
    await axios.delete(`/Ship/${shipId.value}/steamship-agent/${id}`)
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
    await axios.post(`/Ship/${shipId.value}/steamship-agent/${agentId.value}`)
    agentId.value = null
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
    v-model="shipStore.isAddUserShipOpen"
    persistent
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          وكلاء البخارة
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="shipStore.setUserShipDialog(false)"
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
                v-model:model-value="agentId"
                get-url="/User?roleId=3"
                item-label="fullName"
                item-value="id"
                label="الوكيل"
              />
              <VBtn
                class="mt-5"
                color="success"
                @click="addAgent"
              >
                <VIcon>mdi-plus</VIcon>
                اضافة وكيل الباخرة
              </VBtn>
            </div>
          </VCol>
          <VCol cols="12">
            <h4 class="text-h4">
              وكلاء الباخرة
            </h4>
            <p
              v-if="agents.length === 0"
              class="text-caption mt-3"
            >
              لا يوجد وكلاء لهذه الباخرة
            </p>
          </VCol>
          <VCol
            v-for="agent in agents"
            :key="agent.id"
            cols="12"
            md="6"
          >
            <VCard outlined>
              <VCardTitle class="pa-5 d-flex align-center">
                <InfoLabel
                  label="الوكيل"
                  :value="agent.fullName"
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
