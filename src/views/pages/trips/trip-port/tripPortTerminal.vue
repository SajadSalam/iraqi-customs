<script setup lang="ts">
import { dateGTEValidator, requiredValidator } from '@/@core/utils/validators'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

const emits = defineEmits(['update:refresh'])
const tripStore = useTripStore()

const body = ref({
  tripPortId: '',
  terminalId: '',
  secondLandingTerminalId: '',
  landingDate: '',
})

const isLoading = ref(false)
const form = ref<VForm | null>(null)

const tripPort = computed(() => tripStore.tripPort)

const post = async () => {
  try {
    const validate = await form.value?.validate()
    if (!validate.valid)
      return
    isLoading.value = true
    body.value.tripPortId = tripPort.value.id
    await axios.post('/TripPortTerminal', body.value)
    emits('update:refresh', true)
    tripStore.setTripPortTerminalDialog(false)
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
    v-model="tripStore.tripPortTerminalDialog"
    persistent
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          رسو في الميناء
          <VChip>
            {{ tripPort.port?.name }}
          </VChip>
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setTripPortTerminalDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="form"
          :disabled="isLoading"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelectField
                v-model:model-value="body.terminalId"
                :rules="[requiredValidator]"
                label="الرصيف"
                item-label="name"
                item-value="id"
                :get-url="`/DepartmentTerminal?portId=${tripPort.port.id}`"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelectField
                v-model:model-value="body.secondLandingTerminalId"
                label="الرصيف الثاني"
                item-label="name"
                item-value="id"
                :get-url="`/DepartmentTerminal?portId=${tripPort.port.id}`"
              />
            </VCol>
            <VCol
              cols="12"
              md="12"
            >
              <AppDatePicker
                v-model:model-value="body.landingDate"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                :rules="[requiredValidator,
                         v => dateGTEValidator(v, tripPort.arrivalDate, 'وقت الرسو يجب ان يكون بعد وقت الوصول')]"
                label="وقت الرسو"
              />
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-3">
            <VBtn @click="post">
              رسو الى الميناء
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
