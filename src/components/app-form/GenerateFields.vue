<script lang="ts" setup>
import type { FieldTypes } from './types'

interface Props {
  fields: FieldTypes[]
  body: any
}
const props = defineProps<Props>()
const emit = defineEmits(['update:body'])

const body = computed({
  get: () => props.body,
  set: val => emit('update:body', val),
})

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <template
    v-for="(field, index) in fields"
    :key="`field${index}`"
  >
    <slot :name="`before-${field.modelValueKey}`" />
    <VCol

      cols="12"
      :class="{ 'd-none': field.isHidden }"
      :md="field.cols ?? 4"
    >
      <slot
        :name="field.modelValueKey"
        :field="field"
      />
      <AppField
        v-if="!hasSlot(field.modelValueKey)"
        v-model="body[field.modelValueKey as keyof typeof body]"
        :field="field"
      />
    </VCol>
  </template>
</template>
