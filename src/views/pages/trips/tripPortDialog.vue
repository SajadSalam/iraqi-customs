<script setup lang="ts">
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'
import { dateGTEValidator, dateLTEValidator } from '@validators'

const emits = defineEmits(['update:refresh'])
const tableStore = useTableStore()
const routes = useRoute()
const tripStore = useTripStore()

const body = ref({
  tripId: '',
  portId: '',
  entryDate: '',
  arrivalDate: '',
})

const isLoading = ref(false)
const form = ref<VForm | null>(null)
const isEdit = computed(() => tripStore.isEdit)
const itemId = computed(() => tripStore.itemId)

const post = async () => {
  try {
    const validate = await form.value?.validate()
    if (!validate.valid)
      return
    isLoading.value = true
    body.value.tripId = tripStore.trip.id

    if (isEdit.value)
      await axios.put(`/tripPort/${itemId.value.id}`, body.value)
    else
      await axios.post('/tripPort', body.value)
    emits('update:refresh', true)
    tripStore.setTripPortDialog(false)
  }
  catch (e) {
    console.log(e)

    dateGTEValidator(e, 'arrivalDate')
    dateLTEValidator(e, 'entryDate')
  }
  finally {
    isLoading.value = false
  }
}

const trip = computed(() => {
  return tripStore.trip
})

watch(() => isEdit.value, val => {
  if (val) {
    body.value.arrivalDate = itemId.value.arrivalDate
    body.value.entryDate = itemId.value.entryDate
    body.value.portId = itemId.value.port.id
  }
})
watch (() => tripStore.tripPortDialog, val => {
  if (!val)
    tripStore.closeEdit()
})
</script>

<template>
  <VDialog
    v-model="tripStore.tripPortDialog"
    persistent
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          <span v-if="isEdit">تعديل</span>
          وصول الرحلة
          <VChip>
            {{ tripStore.trip.tripNumber }}
          </VChip>
          الى الميناء

        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setTripPortDialog(false)"
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
              md="12"
            >
              <AppSelectField
                v-model:model-value="body.portId"
                label="الميناء"
                item-label="name"
                item-value="id"
                get-url="/port"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDatePicker
                v-model:model-value="body.arrivalDate"
                label="وقت الوصول"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                :rules="[
                  v => dateGTEValidator(v, trip.arrivalDate, `يجب ان يكون وقت الوصول اكبر من وقت الرحلة ${trip.arrivalDate.split('T')[0]}`),
                ]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDatePicker
                v-model:model-value="body.entryDate"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                label="وقت الدخول"
                :rules="[
                  v => dateGTEValidator(v, body.arrivalDate, 'يجب ان يكون وقت الدخول اكبر من وقت الوصول'),
                  v => dateGTEValidator(v, trip.arrivalDate, `يجب ان يكون وقت الدخول اكبر من وقت الرحلة ${trip.arrivalDate.split('T')[0]}`),
                ]"
              />
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-3">
            <VBtn
              :loading="isLoading"
              :color="isEdit ? 'warning' : 'primary'"
              @click="post"
            >
              <span v-if="!isEdit">
                وصول الى الميناء
              </span>
              <span v-else>
                تعديل الوصول الى الميناء
              </span>
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
