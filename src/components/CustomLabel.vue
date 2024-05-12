<script setup lang="ts">
import { toRef } from '@vueuse/core'

interface Props {
  label: string
  value?: string | number
  icon?: string
  to?: string
}
const props = defineProps<Props>()
const label = toRef(props, 'label')
const value = toRef(props, 'value')
const icon = toRef(props, 'icon')
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <div class="d-flex align-center gap-4 ">
    <div class="icon-container bg-light-primary text-primary">
      <VIcon
        size="30"
        :icon="icon ?? 'tabler-info-circle'"
      />
    </div>
    <div class="d-flex flex-column">
      <span class="font-weight-medium text-h4 mb-1">
        {{ label }}
      </span>
      <slot name="value" />

      <RouterLink
        v-if="!hasSlot('value') && to"
        :to="to"
        class="text-decoration-none"
      >
        <span class="font-weight-bold">
          {{ value }}
        </span>
      </RouterLink>
      <span
        v-else-if="!hasSlot('value') && !to"
        class="font-weight-bold text-h4"
      >
        {{ value ?? 'لا يوجد' }}
      </span>
    </div>
  </div>
</template>
