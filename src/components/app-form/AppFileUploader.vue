<script lang="ts" setup>
import axios from '@/plugins/sw-axios'

interface Props {
  label?: string
  modelValue: File[] | null
  dependOn?: string
  rules?: any[]
  multiple?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const isLoading = ref<boolean>(false)

const paths = ref(props.modelValue)
const files = ref<File[]>([])

const uploadAttachment = async () => {
  isLoading.value = true
  try {
    const formData = new FormData()
    if (props.multiple) {
      files.value.forEach(file => {
        formData.append('files', file)
      })
    }
    else {
      formData.append('file', files.value[0])
    }

    const { data } = await axios.post(`/files${props.multiple ? '/multiple' : ''}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    paths.value = data.url
    if (props.multiple)
      paths.value = data.map((file: any) => file.url)

    emit('update:modelValue', paths.value)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(files, () => {
  uploadAttachment()
}, { deep: true })
</script>

<template>
  <!--
    <VFileInput v-model:model-value="paths" variant="outlined" clearable :label="props.label" :multiple="props.multiple"
    chips :rules="props.rules" :loading="isLoading" />
  -->
  <VLabel class="mb-2">
    {{ props.label }}
  </VLabel>
  <VFileInput
    v-model:model-value="files"
    color="deep-purple-accent-4"
    counter
    :multiple="props.multiple"
    :label="props.label"
    prepend-icon="mdi-paperclip"
    variant="outlined"
    :show-size="1000"
    clearable
    :loading="isLoading"
    chips
    :rules="props.rules"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="(fileName, index) in fileNames"
        :key="fileName"
      >
        <VChip
          v-if="index < 2"
          color="deep-purple-accent-4"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </VChip>

        <span
          v-else-if="index === 2"
          class="text-overline text-grey-darken-3 mx-2"
        >
          +{{ paths.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </VFileInput>
</template>
