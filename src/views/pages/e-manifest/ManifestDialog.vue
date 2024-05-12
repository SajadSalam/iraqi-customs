<script setup lang="ts">
import { toFormData } from 'axios'
import { isEmpty } from '@/@core/utils'
import { requiredValidator } from '@/@core/utils/validators'
import { useEManifestStore } from '@/stores/EmanifestStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const EManifestStore = useEManifestStore()
const trips = ref([])
const tripPorts = ref([])
const tripPortTerminals = ref([])
const isLoading = ref(false)
const isXML = computed(() => EManifestStore.isXML)
const fileInput = ref<File[] | null>(null)

// make interface for body
interface Body {
  tripId?: string | null
  tripPortId?: string | null
  tripPortTerminalId: string | null
  goodType: string | null
  isImport: boolean
  file: File | null
}

const body = ref<Body>({
  tripId: null,
  tripPortId: null,
  tripPortTerminalId: null,
  goodType: null,
  isImport: true,
  file: null,
})

const search = ref('')

const getTrips = async () => {
  isLoading.value = true

  const { data } = await axios.get('/trip', {
    params: {
      tripNumber: search.value,
    },
  })

  trips.value = data.result.data
  isLoading.value = false
}

const getTripChildren = async (tripId: string) => {
  isLoading.value = true

  const { data } = await axios.get(`/Trip/${tripId}/trip-ports-terminals`)

  tripPorts.value = data.result.ports
  console.log(data.result.ports)

  isLoading.value = false
}

const form = ref<VForm>(null)

const postData = async () => {
  try {
    isLoading.value = true

    const isValid = await form.value.validate()
    if (!isValid.valid)
      return
    const formData = toFormData(body.value)
    let url = '/Manifests'
    if (isXML.value)
      url = '/Manifests/XML'

    await axios.post(url, formData)

    EManifestStore.setAddDialog(false)
    emits('refresh')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(() => search.value, value => {
  console.log(value)
  if (!isEmpty(value))
    getTrips()
})
watch(() => body.value.tripId, value => {
  if (!isEmpty(value))
    getTripChildren(value as string)

  body.value.tripPortId = null
})
watch(() => body.value.tripPortId, value => {
  if (!isEmpty(value))
    tripPortTerminals.value = tripPorts.value.find(port => port.id === value)?.terminals ?? []

  body.value.tripPortTerminalId = null
})
watch(() => fileInput.value, value => {
  if (!isEmpty(value))
    body.value.file = value[0]
})
watch(() => isXML.value, value => {
  if (value)
    body.value.goodType = 2
  else
    body.value.goodType = null
})
onMounted(() => {
  getTrips()
})
</script>

<template>
  <VDialog
    v-model="EManifestStore.addDialog"
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          إضافة منفيست {{ isXML ? 'XML' : '' }}
        </span>
        <VSpacer />

        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="EManifestStore.setAddDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VRow>
            <VCol
              v-if="!isXML"
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.goodType"
                :rules="[requiredValidator]"
                label="نوع البضاعة"
                :items="[
                  { title: 'حاويات', value: 2 },
                  { title: 'سيارات', value: 1 },
                  { title: 'بضاعة', value: 3 },
                ]"
              />
            </VCol>
            <VCol
              cols="12"
              :md="isXML ? 4 : 6"
            >
              <AppAutocomplete
                v-model="body.tripId"
                v-model:search="search"
                :rules="[requiredValidator]"
                :items="trips"
                label="رقم الرحلة"
                :loading="isLoading"
                item-title="tripNumber"
                item-value="id"
              >
                <template #item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="`${item?.raw?.ship} - ${item?.raw?.steamshipAgent}`"
                    :subtitle="item?.raw?.tripNumber"
                  />
                </template>
              </AppAutocomplete>
            </VCol>
            <VCol
              cols="12"
              :md="isXML ? 4 : 6"
            >
              <AppAutocomplete
                v-model="body.tripPortId"
                :rules="[requiredValidator]"
                :items="tripPorts"
                label="الميناء"
                :loading="isLoading"
                item-title="port"
                :disabled="isEmpty(body.tripId)"
                item-value="id"
              />
            </VCol>
            <VCol
              cols="12"
              :md="isXML ? 4 : 6"
            >
              <AppAutocomplete
                v-model="body.tripPortTerminalId"
                :rules="[requiredValidator]"
                :items="tripPortTerminals"
                label="الرصيف"
                :loading="isLoading"
                item-title="terminal"
                :disabled="isEmpty(body.tripPortId)"
                item-value="id"
              />
            </VCol>

            <VCol cols="12">
              <VFileInput
                v-model="fileInput"
                class="mt-2"
                :rules="[requiredValidator]"
                label="الملف"
                prepend-icon=""
                :prepend-inner-icon="isXML ? 'tabler-file-type-xml' : 'tabler-file-type-xls'"
              />
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-4 gap-3">
            <VBtn
              color="error"
              @click="EManifestStore.setAddDialog(false)"
            >
              إلغاء
            </VBtn>
            <VBtn
              color="primary"
              @click="postData"
            >
              حفظ
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
