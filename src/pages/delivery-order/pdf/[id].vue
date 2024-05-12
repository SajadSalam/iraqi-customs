<script setup lang="ts">
import { onMounted } from 'vue'
import { isEmpty } from '@/@core/utils'
import axios from '@axios'

const pdf = ref(null)
const isLoading = ref(true)
const route = useRoute()
const id = computed(() => route.params.id)
const type = computed(() => route.query.type)

onMounted(async () => {
  const params = {
    isPreview: false,
  }

  if (!isEmpty(type.value))
    params.reportType = type.value

  const { data } = await axios.get(`/deliveryOrder/${id.value}/print`, {
    params,
    responseType: 'arraybuffer',
  })

  console.log(data)

  // data to data URL
  const file = new Blob([data], { type: 'application/pdf' })

  pdf.value = URL.createObjectURL(file)
  isLoading.value = false
})
</script>

<template>
  <div v-if="!isLoading">
    <!-- show pdf -->
    <iframe
      :src="pdf"
      type="application/pdf"
      width="100%"
      height="1000px"
    />
  </div>
  <div
    v-else
    class="d-flex justify-center align-center ma-10 h-75vh"
  >
    <VProgressCircular
      indeterminate
      color="primary"
      size="150"
    />
  </div>
</template>

<style>
.layout-wrapper {
  background-color: #f5f5f5 !important;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  </route>
