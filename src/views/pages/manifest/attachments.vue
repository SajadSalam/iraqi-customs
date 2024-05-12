<script setup lang="ts">
import { toast } from 'vue3-toastify'
import InfoLabel from '../delivery-order/InfoLabel.vue'
import { useManifestStore } from '@/stores/ManifestStore'
import axios, { baseURL } from '@axios'

const ManifestStore = useManifestStore()
const isDialogOpen = computed(() => ManifestStore.attachmentDialog)
const manifestId = computed(() => ManifestStore.editId)

const manifest = ref([])

const isLoading = ref(false)
const file = ref(null)

const fetchmanifest = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/ManifestItemAttachment?manifestId=${manifestId.value.manifestId}&number=${manifestId.value.number}`)

    data.result.data.forEach((item: any) => {
      item.attachments.forEach((attachment: any) => {
        manifest.value.push(attachment)
      })
    })
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

    formData.append('files', file.value[0])
    formData.append('manifestId', manifestId.value.manifestId as string)
    formData.append('number', manifestId.value.number)
    await axios.post('/ManifestItemAttachment', formData)
    fetchmanifest()
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

    await axios.delete(`/manifests/attachment/${id}`)
    fetchmanifest()
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
  if (val) {
    fetchmanifest()
    manifest.value = []
  }
})
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="900"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline"> اضافة المستندات </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="ManifestStore.setAttachmentDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VCol
          cols="12"
          md="6"
        >
          <InfoLabel label="رقم البوليصة">
            <template #value>
              {{ manifestId.number }}
            </template>
          </InfoLabel>
        </VCol>
        <VCol
          cols="12"
          md="12"
        >
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
        </VCol>
      </VCardText>
      <VDivider />
      <VCardText>
        <VRow>
          <VCol
            v-for="attachment in manifest"
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
