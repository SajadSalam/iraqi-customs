<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <VCard
    flat
    class="bg-gradient-primary border-white "
  >
    <VCardTitle class="text-primary py-3 font-weight-bold">
      {{ title }}
    </VCardTitle>
    <div style="width: 100%; height: 4px; background: #fff;" />
    <VCardText>
      <slot />
    </VCardText>
  </VCard>
</template>
