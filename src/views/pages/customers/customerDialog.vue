<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { FieldTypes } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useCustomerStore } from '@/stores/CustomerStore'
import axios from '@axios'

const props = defineProps<Props>()

const emit = defineEmits(['save'])

const customerStore = useCustomerStore()
interface Props {
  urls: ApiUrls
  fields: TableField[]
}

const isDialogOpen = computed(() => customerStore.customerDialog)

const createFields = computed(() => {
  return props.fields.filter(x => x.create).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  })
})

const body = ref<any>({})

const initalData = computed(() => {
  return createFields.value.reduce((acc, curr) => {
    acc[curr.modelValueKey as keyof typeof acc] = null

    return acc
  }, {} as any)
})

onMounted(() => {
  body.value = initalData.value
})

const editId = computed(() => customerStore.editId)
const isLoading = ref(false)
const refForm = ref<VForm>()

const submit = async () => {
  try {
    const isValid = await refForm.value?.validate()

    if (!isValid!.valid)
      return false

    isLoading.value = true

    if (editId.value)
      await axios.put(`${props.urls?.update}/${editId.value}`, body.value)

    else
      await axios.post(props.urls?.create, body.value)

    emit('save')
    customerStore.setCusomerDialog(false)
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

watch(isDialogOpen, val => {
  if (val) {
    if (editId.value) {
      isLoading.value = true
      axios.get(`${props.urls?.get}/${editId.value}`).then(res => {
        body.value = { ...res.data.result }
        body.value.customerType = res.data.result.customerType.value
      }).finally(() => {
        isLoading.value = false
      })
    }
    else {
      body.value = initalData.value
    }
  }
})
watch(isDialogOpen, val => {
  if (!val)
    customerStore.setCloseDialog()
  body.value = initalData.value
})
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span
          v-if="!editId"
          class="headline"
        >
          اضافة مستفيد
        </span>
        <span
          v-else
          class="headline"
        >
          تعديل مستفيد
        </span>
        <VSpacer />
        <VBtn
          color="error"
          size="small"
          icon
          class="rounded-circle"
          @click="customerStore.setCusomerDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="refForm"
          @submit.prevent="submit"
        >
          <VRow>
            <GenerateFields
              v-model:body="body"
              :fields="createFields"
            />
            <VCol cols="12">
              <div class="d-flex justify-end">
                <VBtn
                  class="mx-2"
                  color="error"
                  @click="() => customerStore.setCusomerDialog(false)"
                >
                  <VIcon>mdi-close</VIcon>
                  الغاء
                </VBtn>
                <VBtn
                  :loading="isLoading"
                  type="submit"
                  color="primary"
                >
                  <VIcon>mdi-check</VIcon>
                  حفظ
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
