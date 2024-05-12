<script setup lang="ts">
import { toast } from 'vue3-toastify'
import InfoLabel from '../delivery-order/InfoLabel.vue'
import { useCustomerStore } from '@/stores/CustomerStore'
import axios, { baseURL } from '@axios'

const customerStore = useCustomerStore()
const isDialogOpen = computed(() => customerStore.attachmentDialog)
const customerId = computed(() => customerStore.editId)

const customer = ref({
  attachments: [],
})

const isLoading = ref(false)
const file = ref(null)

const fetchCustomer = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/customers/${customerId.value}`)

    customer.value = data.result
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const saveAttachment = async () => {
  try {
    isLoading.value = true

    const formData = new FormData()

    formData.append('file', file.value[0])
    formData.append('customerId', customerId.value as string)

    await axios.post('/customers/attachment', formData)
    fetchCustomer()
    toast.success('تم الحفظ بنجاح')
  }
  catch (error) {
    console.log(error)
    toast.error('يجب ان يكون الملف اقل من 1 ميجا')
  }
  finally {
    isLoading.value = false
  }
}

const deleteAttachment = async (id: string) => {
  try {
    isLoading.value = true

    await axios.delete(`/customers/attachment/${id}`)
    fetchCustomer()
    toast.success('تم الحذف بنجاح')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(isDialogOpen, val => {
  if (val)
    fetchCustomer()
})
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          اضافة المستندات
        </span>
        <VSpacer />
        <VBtn
          variant="text"
          color="error"
          @click="customerStore.setAttachmentDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex gap-5">
          <VFileInput
            v-model="file"
            label="ارفاق مستند"
            outlined
            prepend-icon="mdi-paperclip"
          />
          <VBtn
            color="primary"
            :loading="isLoading"
            @click="saveAttachment"
          >
            اضافة المستند
          </VBtn>
          <!-- delete -->
        </div>
      </VCardText>
      <VDivider />
      <VCardText>
        <VRow>
          <VCol
            v-for="attachment in customer.attachments"
            :key="attachment.id"
            cols="12"
            md="6"
          >
            <VCard>
              <VCardTitle class="d-flex align-center">
                <InfoLabel label="المستندات المرفقة">
                  <template #value>
                    <VBtn
                      target="_blank"
                      :href="baseURL + attachment.path"
                    >
                      <VIcon>mdi-download</VIcon>
                      رؤية المستند
                    </VBtn>
                  </template>
                </InfoLabel>
                <VSpacer />
                <VBtn
                  color="error"
                  variant="text"
                  :loading="isLoading"
                  text
                  @click="deleteAttachment(attachment.id)"
                >
                  <VIcon>mdi-delete</VIcon>
                </VBtn>
              </VCardTitle>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
