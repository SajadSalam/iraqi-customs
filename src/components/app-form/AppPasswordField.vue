<script setup lang="ts">
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
interface Props {
  label?: string
  modelValue?: string
  rules?: any[]
}

const value = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const isPasswordVisible = ref(false)
</script>

<template>
  <AppTextField
    v-model="value"
    :label="props.label"
    :type="isPasswordVisible ? 'text' : 'password'"
    :rules="props.rules"
    clearable
  >
    <template #append-inner>
      <VIcon
        :color="isPasswordVisible ? 'primary' : ''"
        @click="isPasswordVisible = !isPasswordVisible"
      >
        {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
      </VIcon>
    </template>
  </AppTextField>
</template>
