<script lang="ts" setup>
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import mapboxgl from 'mapbox-gl'
import { useMapConfig } from './utils'

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzN2RyIiwiYSI6ImNtMWt1aGxsaDAyemoybHNlMXYxOXoxeGsifQ.dhHtaQSWy8i1_mCvLu9OAg'
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js',
  null,
  true, // Lazy load the plugin
)

const mapConfig = useMapConfig()
const mapContainer = ref<HTMLElement>()
const draw = ref(null)

const config = computed({
  get: () => mapConfig.config,
  set: value => {
    mapConfig.config = value
  },

})

const map = ref<mapboxgl.Map>()

onMounted(() => {
  // Initialize Mapbox
  config.value.container = mapContainer.value

  map.value = new mapboxgl.Map(config.value)
  draw.value = new MapboxDraw({
    displayControlsDefault: true, // Set to true to show default controls
    controls: {
      polygon: true, // Enable polygon drawing
      trash: true, // Enable the ability to delete shapes
    },
  })

  // Add the draw control to the map
  map.value.on('load', () => {
    map.value.addControl(draw.value) // Add draw control only after the map has loaded
  })

  // Event listeners for drawing polygons
  map.value.on('draw.create', updatePolygon)
  map.value.on('draw.update', updatePolygon)
  map.value.on('draw.delete', updatePolygon)

  // Function to handle polygon updates
  function updatePolygon() {
    const data = draw.value.getAll()
    if (data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates

      console.log('Polygon Coordinates:', coordinates)
    }
  }

  map.value.on('click', async e => {
    console.log(e)
  })

  // map.value.on('click', async e => {
  //   console.log(e)
  // })
  // map.value.on('click', async e => {
  //   console.log(e)
  // })
})
</script>

<template>
  <div
    ref="mapContainer"
    class="map-container"
  />
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
