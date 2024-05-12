<script lang="ts" setup>
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

const emits = defineEmits(['update:refresh'])
const tripStore = useTripStore()
const datesDialog = computed(() => tripStore.datesDialog)
const route = useRoute()
const id = computed(() => tripStore.tripPortTerminal.id)

const body = computed({
  get: () => tripStore.datesBody,
  set: value => tripStore.setDateBody(value),
})

const isLoading = ref(false)

const updateDates = async () => {
  try {
    isLoading.value = true
    await axios.put(`/tripPortTerminal/${id.value}/dates`, body.value)
    tripStore.setDatesDialog(false)
    emits('update:refresh')
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
    v-model="tripStore.datesDialog"
    persistent
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          تعديل التواريخ
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setDatesDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.landingDate"
              label="تاريخ الرسو "
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.exitDate"
              label="تاريخ المغادرة "
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.dischargeStartDate"
              label="تاريخ بدء التفريغ"
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.dischargeEndDate"
              label="تاريخ نهاية التفريغ"
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.startExportingDate"
              label="تاريخ بدء التصدير"
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppDatePicker
              v-model="body.endExportingDate"
              label="تاريخ نهاية التصدير"
              type="datetime-local"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>

          <VCol
            cols="12"
            md="12"
          >
            <div class="d-flex justify-end">
              <VBtn
                variant="outlined"
                class="mx-2"
                color="error"
                @click="tripStore.setDatesDialog(false)"
              >
                إلغاء
              </VBtn>
              <VBtn
                color="primary"
                @click="updateDates"
              >
                تعديل
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
