<script lang="ts" setup>
import { GoogleMap } from 'vue3-google-map'

// import UnionMap from "../svg/UnionMap.vue";

import { center, mapOptions, optionsMap } from '@/constants/mapConfig.ts'
</script>

<template>
  <div>
    <GoogleMap
      api-key="AIzaSyC0Oe6EmSTYIAMSYXKXCL8OAriIj99qVEQ"
      class="homeMap"
      :zoom="12"
      :center="center"
      :styles="optionsMap.style"
      :options="mapOptions"
      :street-view-control="false"
      :map-type-control="false"
      :scrollwheel="false"
    />
  </div>
</template>

<style>
.homeMap {
  border-radius: 2.375rem;
  overflow: hidden;
  height: 12cm;
  width: 14.5cm;
  opacity: 5;
  position: relative;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: gray;
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}
.svgMap {
  position: absolute;
  top: -44px;
  left: 50%;
}
@media (max-width: 768px) {
  .homeMap {
    height: 15cm;
    width: 10cm;
  }
}
@media  (max-width: 500px){
.homeMap {
  height: 10cm;
  width: 6cm;

}
}
</style>
