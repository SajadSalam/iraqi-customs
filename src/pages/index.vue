<script setup lang="ts">
import DeliveryOrder from '@/pages/delivery-order/index.vue'
import ApplicationSection from '@/views/landing-page/application-section.vue'
import HomeSection from '@/views/landing-page/home-section.vue'
import SuccessSection from '@/views/landing-page/success-section.vue'
import { useHomePage } from '@/views/landing-page/utils'

const tableStore = useTableStore()

tableStore.setTitle('الشركة العامة للمعارض والخدمات التجارية العراقية')

const homePage = useHomePage()
const { Route } = homePage
const currentRoute = computed(() => homePage.currentRoute)

const currentComponent = computed(() => {
  if (currentRoute.value === Route.HomeSection)
    return HomeSection
  if (currentRoute.value === Route.ApplicationSection)
    return ApplicationSection
  if (currentRoute.value === Route.DeliveryOrdersSection)
    return DeliveryOrder
  if (currentRoute.value === Route.SuccessSection)
    return SuccessSection

  return HomeSection
})

onMounted(() => {
  // homePage.changeRoute(homePage.Route.HomeSection)
})
</script>

<template>
  <div>
    <Component
      :is="currentComponent"
      :key="currentRoute"
    />
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
