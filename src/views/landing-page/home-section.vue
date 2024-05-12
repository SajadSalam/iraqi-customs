<script setup lang="ts">
import { useNotifyStore } from '@/stores/NotifyStore'
import { useHomePage } from './utils'
import droneVideo from '@/assets/drone.mov'

const homePage = useHomePage()
const { changeRoute, Route } = homePage

const video = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (video.value) {
    video.value.addEventListener('mouseenter', () => {
      video.value?.play()

      // loop
      video.value?.addEventListener('ended', () => {
        video.value?.play()
      })
    })
  }
})

const { showNotification } = useNotifyStore()
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        flat
        class="transparent"
        style="border: 2px solid #fff;"
        height="450"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <div class="d-flex flex-column pa-5 gap-5">
              <VImg
                src="/iraq.png"
                height="100"
                width="100"
              />
              <h1
                class="text-primary text-h1 font-weight-s "
                style="max-width: 75%;"
              >
                البوابة الالكترونية الموحدة
                للاستيراد والتصدير
              </h1>
              <p>
                البوابة الإلكترونية الموحدة للاستيراد والتصدير تسهل التجارة بين الدول بوساطة منصة رقمية، توفر بيئة مركزية لتبادل المعلومات وتيسير الإجراءات الجمركية، مما يقلل من التكاليف ويزيد من كفاءة العمليات التجارية والتصديرية.
              </p>
              <div class="d-flex align-center gap-2">
                <AppTextField placeholder="رقم الطلب" />
                <AppTextField placeholder="نوع المعاملة" />
                <VBtn
                  color="primary"
                  @click="showNotification('s')"
                >
                  <VIcon>mdi-magnify</VIcon>
                  بحث
                </VBtn>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <video
              ref="video"
              autoplay
              loop
              :src="droneVideo"
              style="width: 125%; height: 490px;"
            />
          </VCol>
        </VRow>
      </vcard>
    </VCol>
    <VCol
      cols="12"
      md="6"
      style="align-self: stretch;"
    >
      <VCard
        variant="tonal"
        color="secondary"
        height="100%"
      >
        <VCardTitle class="d-flex align-center justify-center flex-column gap-5 mt-5">
          <div class="bg-white rounded-circle border-1 border-secondary">
            <img
              src="@/assets/import-gateway.png"
              height="120"
              alt=""
              srcset=""
            >
          </div>
          <h2 class="text-h4 text-center text-secondary font-weight-bold">
            بوابة الاستيراد
          </h2>
        </VCardTitle>
        <VCardText class="text-black">
          <p class="text-center">
            بوابة نظام الاستيراد هي منصة إلكترونية تهدف لإصدار وإدارة تراخيص وهويات الاستيراد بشكل سهل وموحد. توفر البوابة بيئة آمنة وفعّالة لتقديم الطلبات وتسهيل عمليات المعالجة، مما يسهم في تسريع وتبسيط الإجراءات الإدارية للمستوردين.
          </p>
          <VBtn
            variant="outlined"
            block
            color="secondary"
            @click="changeRoute(Route.ApplicationSection)"
          >
            <VIcon>tabler-user-circle</VIcon>
            هوية مستورد
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        flat
        class="bg-report border-white bg-gradient-primary"
      >
        <VCardTitle class="d-flex align-center justify-center flex-column gap-5 mt-5">
          <div class="bg-white rounded-circle border-white">
            <img
              src="@/assets/export-gateway.png"
              height="120"
              alt=""
              srcset=""
            >
          </div>
          <h2 class="text-h4 text-center text-primary font-weight-bold">
            بوابة الاستيراد
          </h2>
        </VCardTitle>
        <VCardText class="text-black">
          <p class="text-center">
            بوابة نظام التصدير هي منصة رقمية تُستخدم لإصدار وإدارة تراخيص وهويات التصدير بشكل مبسط وموحّد. توفر البوابة بيئة آمنة وفعالة لتقديم الطلبات وتسريع عمليات المعالجة، مما يسهل الإجراءات الإدارية للمصدرين ويعزز النشاط التصديري.
          </p>
          <VBtn
            variant="outlined"
            block
            color="primary"
            @click="changeRoute(Route.ApplicationSection)"
          >
            <VIcon>tabler-id</VIcon>
            هوية مصدر
          </VBtn>
          <VBtn
            variant="outlined"
            block
            class="mt-2"
            color="primary"
            large
            @click="changeRoute(Route.ApplicationSection)"
          >
            <VIcon>tabler-id-badge-2</VIcon>
            هوية مصدر حكومي
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
