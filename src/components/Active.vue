<script setup lang="ts">
import axios from '@axios'
import { toast } from 'vue3-toastify'

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue: boolean
  updateUrl: string
}

const modelVal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const toggleActive = async () => {
  try {
    const res = await axios.put(props.updateUrl, { isActive: !modelVal.value })
    if (res.status === 200)
      toast.success('تم تحديث الحالة بنجاح')
    modelVal.value = !modelVal.value
  }
  catch (error) {
    toast.error('حدث خطأ ما')
  }
}
</script>

<template>
  <VChip
    label
    :color="modelVal ? 'success' : 'error'"
    :text-color="modelVal ? 'white' : 'black'"
    @click="toggleActive"
  >
    {{ modelVal ? 'مفعل' : 'غير مفعل' }}
  </VChip>
</template>
