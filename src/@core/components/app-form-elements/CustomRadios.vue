<script lang="ts" setup>
import type { CustomInputContent, GridColumn } from '@core/types'

interface Props {
  selectedRadio: null | undefined | boolean | string | number
  radioContent: CustomInputContent[]
  gridColumn?: GridColumn
}

interface Emit {
  (e: 'update:selectedRadio', value: null | undefined | boolean | string | number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const selectedOption = ref(structuredClone(toRaw(props.selectedRadio)))

watch(selectedOption, () => {
  emit('update:selectedRadio', selectedOption.value)
})
</script>

<template>
  <VRadioGroup
    v-if="props.radioContent"
    v-model="selectedOption"
  >
    <VRow>
      <VCol
        v-for="item in props.radioContent"
        :key="item.title"
        v-bind="gridColumn"
      >
        <VLabel
          class="custom-input custom-radio rounded cursor-pointer bg-white"
          :class="selectedOption === item.value ? 'active' : ''"
        >
          <div>
            <VRadio :value="item.value" />
          </div>
          <slot :item="item">
            <div class="flex-grow-1">
              <div class="d-flex align-center mb-1">
                <h6 class="cr-title text-base">
                  {{ item.title }}
                </h6>
                <VSpacer />
                <span
                  v-if="item.subtitle"
                  class="text-disabled text-base"
                >{{ item.subtitle }}</span>
              </div>
              <p class="text-sm mb-0">
                {{ item.desc }}
              </p>
            </div>
          </slot>
        </VLabel>
      </VCol>
    </VRow>
  </VRadioGroup>
</template>

<style lang="scss" scoped>
.custom-radio {
  display: flex;
  align-items: center;
  border-radius: 50px !important;
  background-color: #fff !important;
  gap: 0.375rem;

  .v-radio {
    margin-block-start: -0.25rem;
  }

  .cr-title {
    font-weight: 500;
  }
}
</style>
