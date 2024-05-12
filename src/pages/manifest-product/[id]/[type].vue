<script lang="ts" setup>
import CustomLabel from '@/components/CustomLabel.vue'
import DeliveryOrderTabs from '@/views/pages/delivery-order-item/DeliveryOrderTabs.vue'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'
import { Tabs } from '@/views/pages/delivery-order-item/types'
import axios from '@axios'

const route = useRoute()

// get: `/Manifests/Items?manifestId=${router.currentRoute.value.params.id}&type=${router.currentRoute.value.params.type}`,
const isLoading = ref(false)
interface Data {
  goodType: 1 | 2 | 3
  containers: any[]
  cars: any[]
  goods: any[]
}
const selectedTab = ref<Tabs>(Tabs.Containers)
const staticData = ref()
const currentPage = ref(1)

const goodsData = ref<any[]>([])
const filters = ref<any>({})

const getManifestData = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get('/Manifests/items?', {
      params: {
        ...filters.value,
        manifestId: route.params!.id,
        type: route.params!.type,
        take: 10,
        skip: currentPage.value - 1,
      },
    })

    goodsData.value = data.result
    selectedTab.value = data.result.goodType === 2 ? Tabs.Containers : data.result.goodType === 1 ? Tabs.Cars : Tabs.Goods
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const getManifestStaticts = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/Manifests/${route.params!.id}/statistic?type=${route.params!.type}`)

    staticData.value = data.result
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getManifestData()
  getManifestStaticts()
})

const exludeKeys = ['select']

watch(() => currentPage.value, () => {
  getManifestData()
})

watchDeep(() => filters.value, () => {
  getManifestData()
})
</script>

<template>
  <VCard class="pa-4">
    <VRow v-if="staticData">
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          flat
          class="d-flex justify-center border-1 pa-4 border-primary w-100"
        >
          <CustomLabel
            label="العدد الكلي"
            :value="staticData.all"
            icon="mdi-group"
          />
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          flat
          class="d-flex justify-center border-1 pa-4 border-primary w-100"
        >
          <CustomLabel
            label="المرتبطين بمستفيد"
            :value="staticData.hasCustomer"
            icon="mdi-link"
          />
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          flat
          class="d-flex justify-center border-1 pa-4 border-primary w-100"
        >
          <CustomLabel
            label="الغير مرتبطين بمستفيد"
            :value="staticData.hasNotCustomer"
            icon="mdi-link-off"
          />
        </VCard>
      </VCol>
    </VRow>
  </VCard>
  <br>
  <br>
  <VCard :loading="isLoading">
    <VCardTitle class="d-flex align-center">
      <h3 class="headline">
        بيانات المنفيست
      </h3>
      <VSpacer />
    </VCardTitle>
    <VCardText>
      <DeliveryOrderTabs v-model="selectedTab" />
      <ItemsTable
        :data="selectedTab === Tabs.Goods ? goodsData.goods : selectedTab === Tabs.Cars ? goodsData.cars : goodsData.containers"
        :tab="selectedTab"
        has-filter
        :loading="isLoading"
        :exlude-keys="exludeKeys"
        @filters="filters = $event"
        @refresh="getManifestData"
      />
      <div class="d-flex justify-end">
        <VPagination
          v-model="currentPage"
          :length="(goodsData?.itemCount / 10) + 1"
          :total-visible="5"
          :disabled="isLoading"
          @change="getManifestData"
        />
      </div>
    </VCardText>
  </VCard>
  <Attachments />
</template>

<style lang="" scoped>
</style>
