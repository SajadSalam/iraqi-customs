<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators'
import type { FieldTypes } from '@/components/app-form/types'
import * as fields from '@/pages/trips/fields'
import axiosIns from '@/plugins/axios'
import { useTripStore } from '@/stores/TripsStore'

const emits = defineEmits(['refresh'])

const tripStore = useTripStore()

const isDialogOpen = computed({
  get: () => tripStore.addDialog,
  set: value => tripStore.setAddDialog(value),
})

interface Body {
  tripNumber: string | null
  shipId: string | null
  steamshipAgentId: string | null
  trailerShipId: string | null
  arrivalDate: string | null
  portId: string | null
  entryDate: string | null
  terminalId: string | null
  secondLandingTerminalId: string | null
  landingDate: string | null

}

const body = ref<Body>({
  tripNumber: null,
  shipId: null,
  steamshipAgentId: null,
  trailerShipId: null,
  arrivalDate: null,
  portId: null,
  entryDate: null,
  terminalId: null,
  secondLandingTerminalId: null,
  landingDate: null,
})

const createFields = computed(() => {
  return fields.create.filter(x => x.create).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key
    customField.validations = field.field?.validations

    return customField
  })
})

const additonalFields = computed(() => {
  return fields.additonal.filter(x => x.create).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  })
})

const ship = ref(null)

const isTrailerShip = computed(() => {
  if (ship.value)
    return ship.value.shapeType.value === 1

  return false
})

watch(() => body.value.shipId, () => {
  body.value.steamshipAgentId = null
})

const isLoading = ref(false)
const form = ref(null)

const submit = async () => {
  try {
    const { valid } = await form.value.validate()

    if (!valid)
      return
    isLoading.value = true
    await axiosIns.post('/trip', body.value)
    emits('refresh')
    isDialogOpen.value = false
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model:model-value="isDialogOpen"
    width="900"
    persistent
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        اضافة رحلة
        <VSpacer />
        <VBtn
          icon
          color="error"
          class="rounded-circle"
          size="small"
          @click="isDialogOpen = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="form"
          @submit.prevent="submit"
        >
          <VRow>
            <GenerateFields
              v-model:body="body"
              :fields="createFields"
            />
            <VCol
              cols="12"
              :md="!isTrailerShip ? 6 : 4"
            >
              <AppSelectField
                v-model:object-value="ship"
                v-model="body.shipId"
                label="الباخرة"
                get-url="/ship"
                :rules="[requiredValidator]"
                item-label="name"
                item-value="id"
              />
            </VCol>
            <VCol
              v-if="isTrailerShip"
              cols="12"
              :md="4"
            >
              <AppSelectField
                v-model="body.trailerShipId"
                label="مقطورة الباخرة"
                get-url="/ship?shapeType=2"
                item-label="name"
                item-value="id"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              :md="!isTrailerShip ? 6 : 4"
            >
              <AppSelectField
                v-model="body.steamshipAgentId"
                label="وكيل الباخرة"
                :get-url="`/Ship/${body.shipId ?? '2132'}/steamship-agents`"
                item-label="fullName"
                :rules="[requiredValidator]"
                item-value="id"
                :disabled="!body.shipId"
              />
            </VCol>
            <GenerateFields
              v-model:body="body"
              :fields="additonalFields"
            >
              <template #before-portId>
                <VCol
                  cols="12"
                  :md="12"
                >
                  <h3>
                    وصول الى الميناء <small>
                      (اختياري)
                    </small>
                  </h3>
                </VCol>
              </template>
              <template #before-terminalId>
                <VCol
                  cols="12"
                  :md="12"
                >
                  <h3>
                    رسو الباخرة في الرصيف
                    <small>
                      (اختياري)
                    </small>
                  </h3>
                </VCol>
              </template>
              <template #terminalId="{ field }">
                <AppSelectField
                  v-model="body.terminalId"
                  label="الرصيف"
                  :get-url="`/DepartmentTerminal?portId=${body.portId ?? ''}`"
                  item-label="name"
                  item-value="id"
                  :rules="[requiredValidator]"
                />
              </template>
            </GenerateFields>
            <VCol cols="12">
              <div class="d-flex">
                <VSpacer />
                <VBtn
                  color="primary"
                  :loading="isLoading"
                  type="submit"
                >
                  اضافة
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
