export const useMapConfig = defineStore('mapConfig', () => {
  const config = ref<mapboxgl.MapboxOptions>({
    style: 'mapbox://styles/its7dr/cm1kvnekv00hh01pehnvm3sbq',
    center: [49.05458739211656, 33.553414942401005],
    zoom: 5.5,
    bearing: 1,

    container: 'map',
    testMode: true,
  })

  const zoomInStart = ref<mapboxgl.FlyToOptions>({
    center: [49.05458739211656, 33.553414942401005],
    zoom: 5.5,
    curve: 2,
    pitch: 0,
    bearing: 0,
    offset: [-50, 0],
  })

  const zoomInEnd = ref<mapboxgl.FlyToOptions>({
    center: [1, 1],
    bearing: 100,
    zoom: 0,
    pitch: 40,

    curve: 2,
    offset: [-50, 0],
  })

  return {
    config,
    zoomInStart,
    zoomInEnd,
  }
})
