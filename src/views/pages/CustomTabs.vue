<script lang="ts" setup>
interface Tab {
  name: string
  icon: string
}
interface Props {
  tabs: Tab[]
  modelValue: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: number) => emits('update:modelValue', value),
})
</script>

<template>
  <VRow justify="center">
    <VCol
      v-for="(tab, index) in props.tabs"
      :key="index"
      cols="12"
      md="3"
    >
      <VCard
        class="d-flex align-center justify-center"
        :color="modelValue === index ? 'primary' : 'white'"
        :variant="modelValue === index ? 'tonal' : 'elevated'"
        @click="modelValue = index"
      >
        <VCardTitle>
          <VBtn
            color="primary"
            size="large"
            variant="tonal"
            icon
            class="mx-5"
          >
            <VIcon size="30">
              {{ tab.icon }}
            </VIcon>
          </VBtn>
          <span class="text-h5">
            {{ tab.name }}
          </span>
        </VCardTitle>
      </VCard>
    </VCol>
  </VRow>
</template>
