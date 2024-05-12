<script setup lang="ts">
import { toRef } from '@vueuse/core'

interface Props {
  label: string
  value?: string
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
  <div class="d-flex gap-2">
    <div class="icon-container border text-primary">
      <VIcon
        size="25"
        :icon="icon ?? 'tabler-info-circle'"
      />
    </div>

    <div class="d-flex flex-column">
      <span class="mb-1 text-disabled">
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
        class="font-weight-bold"
      >
        {{ value ?? 'لا يوجد' }}
      </span>
    </div>
  </div>
</template>
