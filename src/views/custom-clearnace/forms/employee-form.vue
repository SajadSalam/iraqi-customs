<script lang="ts" setup>
import type { ClearanceDetails } from '@/pages/custom-clearnace/types'
import { useCustomClearanceService } from '@/pages/custom-clearnace/utils'
import ChangeStatusDialog from '@/views/custom-clearnace/detials/clearance/change-status-dialog.vue'

interface Props {
  detials: ClearanceDetails
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const detials = computed(() => props.detials)
const customClearanceService = useCustomClearanceService()

const body = ref({
  checkType: 0,
  reason: '',
})

const submit = async () => {
  try {
    await customClearanceService.changeStatus(detials.value.customClearance.id, 'change-stauts', {
      status: 4,
    })
  }
  catch (error) {
    console.error(error)
  }
}

const modelValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <ChangeStatusDialog
    v-model="modelValue"
    title="الكاتب \ نقل للكشف"
    @submitted="submit"
  />
</template>
