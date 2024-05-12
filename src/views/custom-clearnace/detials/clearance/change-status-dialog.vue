<script lang="ts" setup>
interface Props {
  modelValue: boolean
  title: string
  submitButtonText?: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'submitted'])

const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const title = computed<string>(() => props.title)
const submitButtonText = computed<string>(() => props.submitButtonText || 'موافقة وانتقال للخطوة التالية')

const onSubmitted = async () => {
  emit('submitted')
  modelValue.value = false
}
</script>

<template>
  <VDialog
    v-model="modelValue"
    persistent
    width="900"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          {{ title }}
        </span>
        <VSpacer />

        <VBtn
          color="error"
          icon
          class="rounded-circle"
          variant="tonal"
          @click="modelValue = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <slot />
        <div class="d-flex align-center  gap-2 mt-5">
          <VAlert
            color="error"
            variant="tonal"
            class="error-with-border"
          >
            بعد الضغط على موافقة لا يمكن التراجع
          </VAlert>
          <VBtn
            color="error"
            variant="outlined"
            @click="modelValue = false"
          >
            إلغاء
          </VBtn>
          <VBtn
            color="primary"
            @click="onSubmitted"
          >
            <VIcon>
              mdi-check-all
            </VIcon>
            {{ submitButtonText }}
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
