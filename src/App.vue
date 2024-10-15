<script setup lang="ts">
import * as signalR from '@microsoft/signalr'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { useTheme } from 'vuetify'
import appsettings from '../public/appsettings.json'
import type { ClearanceDetails } from './pages/custom-clearnace/types'
import { CustomClearanceStatus } from './pages/custom-clearnace/types'
import { hexToRgb } from '@layouts/utils'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import swAxios from '@/plugins/sw-axios'

const { theme } = useThemeConfig()
const baseURL = appsettings['sw-baseURL']

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()
const { global } = useTheme()

const router = useRouter()
const cert = ref<ClearanceDetails>(null)
const isSnackbarOpen = ref(false)

const openCert = (cert: ClearanceDetails) => {
  isSnackbarOpen.value = false
  router.push(`/custom-clearnace/${cert.id}`)
}

const isStatus = (status: CustomClearanceStatus, customClearance: ClearanceDetails) => customClearance?.status === status
const userStore = useUserStore()
const user = computed(() => userStore.user)

onMounted(() => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${baseURL}ClearanceHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build()

  connection.start().catch(console.error)

  connection.on('Clearance', async message => {
    const { data } = (await swAxios.get(`/custom-clearance/${message.id}`))

    cert.value = data
    if (isStatus(CustomClearanceStatus.Check, cert.value) && user.value.role === 'Check')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.Checker, cert.value) && user.value.role === 'Checker')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.Auditor, cert.value) && user.value.role === 'Auditor')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.Manager, cert.value) && user.value.role === 'Manager')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.TaxWriter, cert.value) && user.value.role === 'TaxWriter')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.TaxChecker, cert.value) && user.value.role === 'TaxChecker')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.TaxComplete, cert.value) && user.value.role === 'TaxComplete')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.MerchantView, cert.value) && user.value.role === 'MerchantView')
      isSnackbarOpen.value = true

    if (isStatus(CustomClearanceStatus.MerchantComplete, cert.value) && user.value.role === 'MerchantComplete')
      isSnackbarOpen.value = true

    // isSnackbarOpen.value = true
  })
})

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()

onMounted(() => {
  theme.value = 'light'
})
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
      <VSnackbar
        v-model="isSnackbarOpen"
        :timeout="2000"
        color="blue-grey"
        opacity="0.5"
        multi-line
      >
        <div class=" pb-2">
          لديك تصريحة جديدة بأنتظار التدقيق والمتابعة
        </div>

        <p>
          <VIcon>
            mdi-numeric
          </VIcon>
          {{ cert.number }}
        </p>
        <p>
          <VIcon>
            mdi-account
          </VIcon>
          {{ cert.certificate?.customer?.ceo?.fullName }}
        </p>
        <p>
          <VIcon>
            mdi-file-document
          </VIcon>
          {{ cert.certificate?.description }}
        </p>
        <div class="d-flex">
          <VSpacer />
          <VBtn
            variant="text"
            color="white"
            @click="openCert(cert)"
          >
            انتقال للتصريحة
          </VBtn>
        </div>
      </VSnackbar>
    </VApp>
  </VLocaleProvider>
</template>
