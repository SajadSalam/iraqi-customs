<script setup lang="ts">
import { useDependStore } from '@/stores/DependStore'
import AppSelectField from './AppSelectField.vue'
import type { FieldTypes, SelectableFieldType } from './types'
import { FieldType } from './types'

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const dependStore = useDependStore()

interface Props {
  field: FieldTypes
  modelValue?: string | number | boolean | SelectableFieldType | string[] | number[] | File[] | undefined
  icon?: string
  dependsOnValue?: any[] | undefined
  dependsOn?: any[] | undefined
  isFilter?: boolean
}

const value = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

onMounted(() => {
  if (props.field.type === FieldType.Checkbox || props.field.multiple)
    value.value = []
  if (props.field.defualtValue)
    value.value = props.field.defualtValue
})

const getItemValue = (item: any) => {
  if (typeof item === 'string')
    return item
  const itemValue = props.field.options?.itemValue as string

  return itemValue ? item[itemValue] : item.id
}

const getItemLabel = (item: any) => {
  if (typeof item === 'string')
    return item

  const itemLabel = props.field.options?.itemLabel as string

  return itemLabel ? item[itemLabel] : item.name
}

watch(() => props.modelValue, () => {
  if (props.field.options?.haveDependOn) {
    if (dependStore.setDependValue)
      dependStore.setDependValue(props.modelValue as keyof typeof dependStore.dependValue)

    else
      console.log(dependStore)
  }
})
</script>

<template>
  <AppTextField
    v-if="field.type === FieldType.Text || field.type === FieldType.Number"
    v-model="value"
    clearable
    :label="field.label"
    :type="field.type === FieldType.Number ? 'number' : 'text'"
    hide-details="auto"
    :append-inner-icon="!props.isFilter ? icon : 'mdi-magnify'"
    :rules="!props.isFilter ? field.validations : []"
    :disabled="props.field.disabled"
    variant="outlined"
  />
  <AppTextField
    v-else-if="field.type === FieldType.Textarea"
    v-model="value"
    clearable
    hide-details="auto"
    :rules="field.validations"
    :append-inner-icon="icon"
    :label="field.label"
    variant="outlined"
    type="textarea"
  />

  <!--
    <AppSelectField
    v-else-if="field.type === FieldType.Select"
    v-model="value"
    clearable
    :item-value="field.options?.itemValue ?? 'id'"
    hide-details="auto"
    :item-label="field.options?.itemLabel ?? 'name'"
    :append-inner-icon="icon"
    :items="field.options?.items"
    :label="field.label"
    :rules="!props.isFilter ? field.validations : []"
    :get-url="field.options?.getURL"
    :depends-on-value="props.dependsOnValue"
    :depend-on="field.options?.dependOn"
    :multiple="field?.multiple"
    :search-key="field.options?.searchKey"
    />
  -->
  <AppSelectField
    v-else-if="field.type === FieldType.Select"
    v-model="value"
    clearable
    :item-value="field.options?.itemValue ?? 'id'"
    hide-details="auto"
    :item-label="field.options?.itemLabel ?? 'name'"
    :append-inner-icon="icon"
    :items="field.options?.items"
    :label="field.label"
    :rules="!props.isFilter ? field.validations : []"
    :get-url="field.options?.getURL"
    :depends-on-value="props.dependsOnValue"
    :depend-on="field.options?.dependOn"
    :multiple="field?.multiple"
    :fetch-on-search="field?.fetchOnSearch"
    :search-key="field?.searchKey"
  />
  <AppDatePicker
    v-else-if="field.type === FieldType.Date"
    v-model="value"
    :append-inner-icon="icon"
    hide-details="auto"
    :label="field.label"
    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
    clearable
  />
  <VRadioGroup
    v-else-if="field.type === FieldType.Radio"
    v-model="value"
    :append-inner-icon="icon"
    :rules="!props.isFilter ? field.validations : []"
    hide-details="auto"
    :label="field.label"
    inline
    clearable
  >
    <VRadio
      v-for="item in field.options?.items"
      :key="getItemValue(item)"
      class="m-0 p-0"
      :label="getItemLabel(item)"
      hide-details="auto"
      :value="getItemValue(item)"
    />
  </VRadioGroup>
  <div
    v-else-if="field.type === FieldType.Checkbox"
    class="d-flex align-center"
  >
    <VCheckbox
      v-for="item in field.options?.items"
      :key="getItemValue(item)"
      v-model="value"
      :label="getItemLabel(item)"
      hide-details="auto"
      :value="getItemValue(item)"
    />
  </div>
  <AppDatePicker
    v-else-if="field.type === FieldType.DateTime"
    v-model="value"
    :append-inner-icon="icon"
    :rules="!props.isFilter ? field.validations : []"
    hide-details="auto"
    :label="field.label"

    clearable
  />

  <!--
    <VFileInput v-else-if="field.type === FieldType.File" v-model="value" variant="outlined" clearable :label="field.label"
    :multiple="field.multiple" chips :rules="!props.isFilter ? field.validations : []" />
  -->
  <VFileInput
    v-else-if="field.type === FieldType.File"
    v-model="value"
    color="deep-purple-accent-4"
    counter
    :multiple="field.multiple"
    :label="field.label"
    prepend-icon="mdi-paperclip"
    variant="outlined"
    :show-size="1000"
    clearable
    chips
    :rules="!props.isFilter ? field.validations : []"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="(fileName, index) in fileNames"
        :key="fileName"
      >
        <VChip
          v-if="index < 2"
          color="primary"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </VChip>
      </template>
    </template>
  </VFileInput>
  <AppPasswordField
    v-else-if="field.type === FieldType.Password"
    v-model="value"
    :label="field.label"
    :rules="!props.isFilter ? field.validations : []"
    clearable
  />
</template>
