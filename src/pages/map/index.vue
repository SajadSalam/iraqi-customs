<script lang="ts" setup>
import { useMotionControls, useMotionProperties } from '@vueuse/motion'
import mapboxgl from 'mapbox-gl'
import { useMapConfig } from './utils'
import { formatDate } from '@/@core/utils/formatters'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqYWRzYWxhbSIsImEiOiJjbGhwaGVmcmowNzIxM2tvOHF2NzJoc2U1In0.5GFUtHf505LWRo4HsuEEqQ'

const card = ref<HTMLElement>()
const cardMotionProperties = useMotionProperties(card)

const cardMotion = useMotionControls(cardMotionProperties.motionProperties, {
  initial: {
    x: -200,
    opacity: 0,
  },
  custom: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1000,
    },
  },
})

const learnCard = ref<HTMLElement>()
const learnCardMotionProperties = useMotionProperties(learnCard)

const learnCardMotion = useMotionControls(learnCardMotionProperties.motionProperties, {
  initial: {
    x: 200,
    opacity: 0,
    transition: {
      duration: 1000,
    },
  },
  custom: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1000,
    },
  },
})

const selectedMarker = ref(0)

cardMotion.apply('initial')
learnCardMotion.apply('custom')

const ports = [
  {
    coordinates: [47.7124335, 30.1033843],
    title: 'منفذ سفوان',
  },
  {
    coordinates: [45.0705223, 30.101558],
    title: 'منفذ الشلامجة',
  },
  {
    coordinates: [46.049142, 33.123790], // 33.123790, 46.049142
    title: 'منفذ زرباطية',
  },
  {
    coordinates: [41.2015453, 36.8511575],
    title: 'منفذ إبراهيم الخليل',
  },
  {
    coordinates: [45.480023, 33.951158],
    title: 'منفذ المنذرية',
  },
  {
    coordinates: [41.0908754, 34.532746],
    title: 'منفذ طريبيل',
  },
  {
    coordinates: [47.4046136, 31.0270583],
    title: 'منفذ البصرة',
  },
]

const mapConfig = useMapConfig()
const mapContainer = ref<HTMLElement>()

const start = computed({
  get: () => mapConfig.zoomInStart,
  set: value => {
    mapConfig.zoomInStart = value
  },

})

const end = computed({
  get: () => mapConfig.zoomInEnd,
  set: value => {
    mapConfig.zoomInEnd = value
  },
})

const config = computed({
  get: () => mapConfig.config,
  set: value => {
    mapConfig.config = value
  },

})

const isCardShow = ref(false)
const markers = ref([])
const map = ref<mapboxgl.Map>()
const isLearnShow = ref(true)

const flyToPort = index => {
  selectedMarker.value = index

  const latLng = ports[index].coordinates

  isLearnShow.value = false
  end.value.center = latLng
  end.value.zoom = map.value.getZoom() + 2
  map.value.flyTo({
    ...end.value,
    duration: 3000,
    essential: true,
    easing: t => {
      if (t === 1)
        isCardShow.value = true

      return t
    },
  })
}

onMounted(() => {
  // Initialize Mapbox
  config.value.container = mapContainer.value

  map.value = new mapboxgl.Map(config.value)
  for (const feature of ports) {
  // create a HTML element for each feature
    const el = document.createElement('div')

    el.className = 'marker'
    el.innerHTML = feature.title

    const marker = new mapboxgl.Marker(el)

    marker
      .setLngLat(feature.coordinates)
      .addTo(map.value)

    markers.value.push({ marker, feature })
    marker.getElement().addEventListener('click', () => {
      flyToPort(ports.indexOf(feature))
    })
  }
  let isAtStart = true
  map.value.on('click', async e => {
    isAtStart = !isAtStart
    if (isAtStart) {
      map.value.flyTo({
        ...start.value,
        duration: 1500,
        essential: true,
        easing: t => {
          isCardShow.value = false
          if (t === 1)
            isLearnShow.value = true

          return t
        },
      })
    }
  })
})
watch(isCardShow, value => {
  if (value)
    cardMotion.apply('custom')
  else
    cardMotion.apply('initial')
})

watch(isLearnShow, value => {
  if (value)
    learnCardMotion.apply('custom')
  else
    learnCardMotion.apply('initial')
})

const router = useRouter()
</script>

<template>
  <div
    v-motion="{
      initial: {
        y: -100,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1000,
        },
      },
    }"
    class="d-flex align-center justify-space-between appbar pa-2 mt-3"
  >
    <div class="d-flex align-center">
      <img
        src="/iraq.png"
        alt=""
        srcset=""
        style="width: 100px; height: 100px; object-fit: contain ;"
      >
      <div>
        <h2 class="text-white">
          جمهورية العراق
        </h2>
        <p class="text-white mt-1">
          نظام مراقبة المنافذ الحدودية والجمارك
        </p>
      </div>
    </div>
    <VBtn
      variant="outlined"
      @click="router.push('/')"
    >
      <VIcon>
        mdi-arrow-left
      </VIcon>
      رجوع الى نظام النافذة الواحدة
    </VBtn>
  </div>
  <div
    ref="mapContainer"
    class="map-container"
  />
  <VCard
    v-if="selectedMarker !== null"
    ref="card"
    class="overall"
  >
    <VCardTitle class="pa-5">
      {{
        ports[selectedMarker].title
      }}
    </VCardTitle>
    <VCardText class="mt-5">
      <VRow class="justify-center">
        <VCol
          cols="12"
          md="6"
        >
          <VCard
            variant="tonal"
            color="primary"
            class="pa-2"
          >
            <h1 class="text-primary">
              423
            </h1>
            امر تسليم بحري
          </VCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VCard
            variant="tonal"
            color="warning"
            class="pa-2"
          >
            <h1 class="text-warning">
              122
            </h1>
            امر تسليم جوي
          </VCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VCard
            variant="tonal"
            color="success"
            class="pa-2"
          >
            <h1 class="text-success">
              32
            </h1>
            امر تسليم بري
          </VCard>
        </VCol>

        <VCol
          cols="12"
          md="12"
        >
          <VCard class="bg-gradient-primary border-white">
            <VCardTitle class="text-primary py-3 font-weight-bold">
              تصاريح المشبوهة
            </VCardTitle>
            <VCardText>
              <VCard
                v-for="i in 5"
                :key="i"
                to="/custom-clearnace/302836d5-7f13-4dce-a1aa-69d3c8b7b5cd?error=true"
                target="_blank"
                class="my-2"
              >
                <VCardTitle class="d-flex align-center gap-2">
                  <div class="warning-with-border rounded-lg pa-1">
                    <VIcon>
                      mdi-alert-circle-outline
                    </VIcon>
                  </div>
                  <div>
                    <h3 class="text-h6">
                      حدث تغير في وزن البضاعة في
                      {{ ports[selectedMarker].title }}
                    </h3>
                    <span class="text-h6">
                      {{
                        formatDate(new Date().toISOString())
                      }}
                    </span>
                  </div>
                </VCardTitle>
              </VCard>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard
    ref="learnCard"
    class="learn bg-transparent"
  >
    <VCardTitle class="d-flex align-center justify-center text-white flex-column gap-5">
      <div class="learn-marker">
        <VIcon size="70">
          mdi-map-marker
        </VIcon>
      </div>
      <h3 class="mt-5 text-h3 text-white">
        قم بالضغط على احد المنافذ الحدودية
      </h3>
      <p class="text-h6 text-white">
        للتحرك الى الموقع ورؤية جميع احصائيات المنفذ
      </p>
    </VCardTitle>
    <VCardText>
      <VChipGroup>
        <VChip
          v-for="(port, index) in ports"
          :key="index"
          variant="outlined"
          @click="flyTo(port, index)"
        >
          {{
            port.title
          }}
        </VChip>
      </VChipGroup>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
@import "../../styles/variable";

.learn {
  position: absolute;
  z-index: 1000;
  right: 7%;
  bottom: 7%;
  width: 30%;
  height: 75%;
  border-radius: 0;
  background: transparent;
  color: white;

  .learn-marker {
    position: relative;
    padding: 10px;
    border-radius: 50%;
    animation: scaling 3s ease infinite;
    color: $primary;
  }
}

@keyframes scaling {
  0%,
  100% {
    transform: translateY(20px) scale(1.2);
  }

  50% {
    transform: translateY(0);
  }
}

.appbar {
  position: absolute;
  z-index: 1000 !important;
  top: 0;
  width: 100%;
  height: 100px;
}

.map-container {
  height: 100vh;
  overflow-y: hidden !important;
}

.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  font-family: "Open Sans", sans-serif;
  text-align: center;
}

.marker {
  width: 120px;
  height: 100px;
  padding-top: 25px;
  color: white;
  cursor: pointer;
  font-family: Cairo, sans-serif;
  font-size: 12px;
  text-align: center;

  &::before {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 95%;
    background-image: url("/mapbox-icon.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    content: "";
  }
}

.overall {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  border-radius: 0;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
