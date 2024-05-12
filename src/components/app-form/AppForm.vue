<script setup lang="ts">
import { toFormData } from 'axios'
import { toast } from 'vue3-toastify'
import AppField from './AppField.vue'
import type { FieldTypes } from './types'
import axios from '@axios'

const props = defineProps<Props>()

const emit = defineEmits(['cancel', 'save'])
interface Props {
  fields: FieldTypes[]
  submitUrl: string
  submitBtnText?: string
  cancelBtnText?: string
  title?: string
  editId?: string | number
  initalData: any
  formData?: boolean
}
const data = reactive(props.initalData)
const isLoading = ref(false)

const refForm = ref<VForm>()

const submit = async () => {
  console.log('test')

  try {
    const isValid = await refForm.value?.validate()

    console.log(isValid)
    if (!isValid!.valid)
      return false
    isLoading.value = true
    console.log(data)

    if (props.editId)
      await axios.put(`${props.submitUrl}/${props.editId}`, props.formData ? toFormData(data) : data)

    else
      await axios.post(props.submitUrl, props.formData ? toFormData(data) : data)

    emit('save')
    toast.success('تم الحفظ بنجاح')
  }
  catch (error) {
    console.log(error)

    toast.error('حدث خطأ ما')
  }
  finally {
    isLoading.value = false
  }
}

const slots = useSlots()
const hasSlot = (name?: string) => !!slots[name!]

const getDependValue = (listOfDepends: string | undefined): any[] | undefined => {
  if (listOfDepends == undefined)
    return undefined
  const fields = listOfDepends?.split(',')

  const shpae: any[] = []

  fields.forEach(field => {
    const dependField = props.fields.find(f => f.modelValueKey === field)

    if (dependField != undefined)

      shpae.push({ name: dependField.modelValueKey, value: data[dependField.modelValueKey] })
  })

  return shpae
}

const getDependValueKey = (listOfDepends: string | undefined): string | undefined => {
  if (listOfDepends == undefined)
    return undefined
  const fields = listOfDepends?.split(',')

  let key = ''

  fields.forEach(field => {
    const dependField = props.fields.find(f => f.modelValueKey === field)

    if (dependField != undefined)

      key += `${data[dependField.modelValueKey]},`
  })

  return key
}

props.fields.forEach(field => {
  if (field.validations && field.validations?.findIndex((item: any) => item.name === 'requiredValidator') !== -1)
    field.label += ' *'
})
</script>

<template>
  <VForm
    ref="refForm"
    class="py-3"
    :disabled="isLoading"
    @submit.prevent="submit"
  >
    <VRow>
      <VCol
        v-for="(field, index) in fields"
        :key="`field${index}`"
        cols="12"
        :class="{ 'd-none': field.isHidden }"
        :md="field.cols ?? 4"
      >
        <AppField
          :key="getDependValueKey(field.dependsOn)"
          v-model="data[field.modelValueKey]"
          :field="field"
          :depends-on-value="getDependValue(field.dependsOn)"
        />
      </VCol>
      <VCol cols="12">
        <div class="d-flex align-end justify-end">
          <VBtn
            class="mx-2"
            color="error"
            variant="outlined"
            @click="() => emit('cancel')"
          >
            {{ cancelBtnText ?? 'الغاء' }}
          </VBtn>
          <VBtn
            :loading="isLoading"
            type="submit"
            color="primary"
          >
            {{ submitBtnText ?? 'حفظ' }}
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </VForm>
</template>
