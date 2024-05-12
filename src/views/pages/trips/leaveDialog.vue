<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators'
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import axios from '@axios'

interface Props {
  type: 'trip' | 'tripPort' | 'tripPortTerminal'
}
const props = defineProps<Props>()
const tripStore = useTripStore()
const exitId = computed(() => tripStore.exitId)
const tableStore = useTableStore()
interface Body {
  exitDate: string
}

const body = ref<Body>({
  exitDate: '',
})

const form = ref<any>(null)

const leave = async () => {
  try {
    const validate = await form.value?.validate()
    if (!validate.valid)
      return
    await axios.put(`/${props.type}/${exitId.value}/exit`, body.value)
    await tableStore.setRefresh(true)
    tripStore.setLeaveDialog(false)
  }
  catch (e) {
    console.log(e)
  }
}

const openLeave = (item: any) => {
  tripStore.setTrip(item)
  tripStore.setLeaveDialog(true)
}

const isAddDialogOpen = computed(() => tripStore.leaveDialog)
</script>

<template>
  <VDialog
    v-model="tripStore.leaveDialog"
    persistent
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          مغادرة
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="tripStore.setLeaveDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <AppDatePicker
                v-model="body.exitDate"
                label="تاريخ المغادرة"
                type="datetime-local"
                :rules="[requiredValidator]"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
              />
            </VCol>
          </VRow>

          <VBtn
            class="mt-4"
            block
            color="success"
            @click="leave"
          >
            مغادرة
          </VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
