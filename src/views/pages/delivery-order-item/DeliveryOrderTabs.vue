<script setup lang="ts">
import { Tabs } from './types'

interface Props {
  modelValue: Tabs
  className?: string

}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})
</script>

<template>
  <VTabs
    v-model="modelValue"
    align-tabs="center"
    class="do-tabs"
    height="60px"
    fixed-tabs
    :class="className"
  >
    <VTab :value="Tabs.Containers">
      حاويات
    </VTab>
    <VTab :value="Tabs.Cars">
      سيارات
    </VTab>
    <VTab :value="Tabs.Goods">
      بضائع
    </VTab>
  </VTabs>
</template>
