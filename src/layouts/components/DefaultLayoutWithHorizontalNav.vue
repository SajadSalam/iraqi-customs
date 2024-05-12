<script lang="ts" setup>
import navItems from '@/navigation/horizontal'

// Components
import UserProfile from '@/layouts/components/UserProfile.vue'
import { useTableStore } from '@/stores/AppTableStore'
import { HorizontalNavLayout } from '@layouts'

const tableStore = useTableStore()
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        to="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <img
          src="/logo.png"
          alt=""
          srcset=""
          height="65"
        >

        <!--
          <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          بوابة التصدير والاستيراد الالكترونية
          </h1>
        -->
        <h1 class="text-h4 font-weight-regular ">
          <small class="text-h6">
            بوابة التصدير والاستيراد الالكترونية /
          </small>
          {{ tableStore.title }}
        </h1>
      </RouterLink>
      <VSpacer />

      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Component
        :is="Component"
        class="ma-0"
      />
    </RouterView>

    <!-- 👉 Footer -->

    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>
