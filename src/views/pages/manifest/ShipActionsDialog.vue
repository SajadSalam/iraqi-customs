<script setup lang="ts">
import { useManifestStore } from '@/stores/ManifestStore'

const manifestStore = useManifestStore()
</script>

<template>
  <VDialog
    v-model="manifestStore.shipActionDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">عمليات الباخرة</span>
        <VSpacer />

        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="manifestStore.setShipActionDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            style="position: relative;"
          >
            <VForm>
              <VCard flat>
                <!-- Trip Info -->
                <VCardText>
                  <p class="text-h5 font-weight-bold">
                    <VBtn
                      color="primary"
                      size="large"
                      variant="tonal"
                      icon
                    >
                      <VIcon size="25">
                        tabler-anchor
                      </VIcon>
                    </VBtn>
                    <span class="mx-2">وصول</span>
                  </p>
                  <VDivider
                    color="primary"
                    thickness="3"
                    class="mx-5"
                  />
                  <VRow class="mt-2">
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="الميناء" />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="الرصيف" />
                    </VCol>
                  </VRow>
                </VCardText>
                <!-- Trip port and terminal Info -->
                <VCardText>
                  <p class="text-h5 font-weight-bold">
                    <VBtn
                      color="primary"
                      size="large"
                      variant="tonal"
                      icon
                    >
                      <VIcon size="25">
                        tabler-anchor
                      </VIcon>
                    </VBtn>
                    <span class="mx-2">رسو</span>
                  </p>
                  <VDivider
                    color="primary"
                    thickness="3"
                    class="mx-5"
                  />
                  <VRow class="mt-2">
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="الميناء" />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="الرصيف" />
                    </VCol>
                  </VRow>
                </VCardText>
                <VCardText>
                  <p class="text-h5 font-weight-bold">
                    <VBtn
                      color="primary"
                      size="large"
                      variant="tonal"
                      icon
                    >
                      <VIcon size="25">
                        tabler-notebook
                      </VIcon>
                    </VBtn>
                    <span class="mx-2">نقل</span>
                  </p>
                  <VDivider
                    color="primary"
                    thickness="3"
                    class="mx-5"
                  />
                  <VRow
                    align="center"
                    class="mt-2"
                  >
                    <VCol
                      cols="12"
                      md="12"
                    >
                      <AppAutocomplete label="نوع الانتقال" />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="من رصيف" />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete label="الى رصيف" />
                    </VCol>
                    <VCol
                      cols="12"
                      md="12"
                    >
                      <AppDatePicker label="تاريخ العملية" />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VForm>
            <div
              flat
              class=" sticky-footer"
            >
              <VCardText class="w-100">
                <div class="d-flex align-center justify-center w-100">
                  <VBtn
                    color="primary"
                    class="mx-2 w-100"
                  >
                    <VIcon class="ml-2">
                      mdi-content-save
                    </VIcon>
                    حفظ
                  </VBtn>
                </div>
              </VCardText>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
