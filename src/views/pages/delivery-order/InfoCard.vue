<script setup lang="ts">
interface Props {
  icon: string
  title: string
  info?: string
}
const props = defineProps<Props>()
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <VCard flat>
    <VCardText class="border mx-2 rounded">
      <div class="d-flex align-center">
        <VBtn
          color="primary"
          size="small"
          icon
        >
          <VIcon size="20">
            {{ icon }}
          </VIcon>
        </VBtn>
        <div class="d-flex flex-column text-right mr-3">
          <span class="text-h6">
            {{ title }}
          </span>
          <span
            v-if="info && !hasSlot('info')"
            class="text-h5 mt-1 text-right"
          >
            {{ info }}
          </span>
          <div
            v-if="hasSlot('info')"
            class="mt-1"
          >
            <slot name="info" />
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
