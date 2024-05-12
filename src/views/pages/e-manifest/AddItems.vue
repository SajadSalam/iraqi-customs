<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import { useEManifestStore } from '@/stores/EmanifestStore'
import CustomTabs from '../CustomTabs.vue'
import ContainerForm from '../uploading-order/ContainerForm.vue'
import type { Car, Container, Good } from '../uploading-order/types'

const EManifestStore = useEManifestStore()
const isLoading = ref(false)

const body = ref<Body>({
  containers: [],
  cars: [],
  goods: [],
})

const selectedTab = ref(0)

const isDialogOpen = computed({
  get() {
    return EManifestStore.isAddItemDialogOpen
  },
  set(value) {
    EManifestStore.setAddItemDialog(value)
  },
})

const staticTabs = [
  {
    name: 'الحاويات',
    icon: 'tabler-package',
  },
  {
    name: 'السيارات',
    icon: 'tabler-car',
  },
  {
    name: 'البضائع',
    icon: 'tabler-box',
  },
]

const tabs = computed(() => {
  const type = EManifestStore.manifest.goodType
  if (type === 2)
    return [staticTabs[0]]

  if (type === 1)
    return [staticTabs[1]]

  return [staticTabs[2]]
})

const panels = ref<number>(0)
const form = ref<any>(null)

const addCar = () => {
  body.value.cars?.unshift({
    number: '',
    size: 0,
    weight: 0,
    carType: '',
    carBrand: '',
    carModel: '',
    carColor: '',
    vinNo: '',
    carDetails: '',
    isDamage: false,
    entryDate: new Date(),
    customerInfo: '',
  })
}

const addGoods = () => {
  body.value.goods?.unshift({
    goodTypeId: '',
    number: '',
    size: 0,
    weight: 0,
    quantity: 0,
    goodsDetails: '',
    isNational: false,
    customerInfo: '',
  })
}

const addContainer = () => {
  body.value.containers?.unshift({
    containerId: '',
    isEmpty: false,
    customerInfo: '',
    goodsDetails: '',
    insidePort: false,
    entryDate: new Date(),
    loadingDate: new Date(),
    number: '',
    containerState: 1,
    cars: [],
    goods: [],
  })
}

const initData = () => {
  body.value.cars = []
  body.value.goods = []
  body.value.containers = []
  if (selectedTab.value === 0)
    addContainer()

  else if (selectedTab.value === 1)
    addCar()

  else
    addGoods()
}

const addNew = () => {
  if (selectedTab.value === 0)
    addContainer()

  else if (selectedTab.value === 1)
    addCar()

  else
    addGoods()
}

watch(() => selectedTab.value, () => {
  initData()
})
initData()
interface Body {
  containers: Container[]
  cars: Car[]
  goods: Good[]
}

const modifyArray = computed({
  get: () => {
    switch (selectedTab.value) {
      case 0:
        return body.value.containers
      case 1:
        return body.value.cars
      case 2:
        return body.value.goods
    }
  },
  set: value => {
    switch (selectedTab.value) {
      case 0:
        body.value.containers = value
        break
      case 1:
        body.value.cars = value
        break
      case 2:
        body.value.goods = value
        break
    }
  },
})

const submit = async () => {
  isLoading.value = true
  try {
    await axiosIns.post(`/Manifests/${EManifestStore.manifest.id}/Items`, body.value)
    isDialogOpen.value = false
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(() => isDialogOpen.value, () => {
  if (isDialogOpen.value)
    initData()
})
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="85%"
    @click:outside="isDialogOpen = false"
  >
    <VCard class="pa-3">
      <VCardTitle class="d-flex">
        اضافة بيانات الى المنفست
        <VSpacer />
        <VIcon
          color="error"
          @click="isDialogOpen = false"
        >
          mdi-close
        </VIcon>
      </VCardTitle>
      <VCardText>
        <CustomTabs
          v-model="selectedTab"
          :tabs="tabs"
        />
        <VForm ref="form">
          <div class="d-flex justify-end mt-5">
            <VBtn
              color="secondary"
              class="mx-2"
              @click="addNew"
            >
              <VIcon>mdi-plus</VIcon>
              إضافة {{ tabs[selectedTab].name }}
            </VBtn>
            <VBtn

              color="primary"
              @click="submit"
            >
              <VIcon>mdi-content-save</VIcon>
              حفظ البيانات
            </VBtn>
          </div>
          <VExpansionPanels
            v-model:model-value="panels"
            class="mt-3"
          >
            <VExpansionPanel
              v-for="(detail, i) in modifyArray"
              :key="i"
            >
              <VExpansionPanelTitle>
                <template #default="{ expanded }">
                  <VRow no-gutters>
                    <VCol
                      cols="4"
                      class="d-flex justify-start align-center"
                    >
                      <VIcon
                        size="30"
                        color="primary"
                        :icon="tabs[selectedTab].icon"
                      />
                      <span :class="`font-weight-bold mx-2 ${expanded ? 'text-primary' : ''}`">
                        {{ tabs[selectedTab].name }}
                        :
                        {{ i + 1 }}
                      </span>
                    </VCol>
                    <VCol
                      cols="4"
                      class="text-grey"
                    />
                    <VCol
                      cols="4"
                      class="d-flex justify-end"
                    >
                      <VBtn
                        v-if="modifyArray?.length > 1"
                        color="error"
                        variant="text"
                        @click.stop="modifyArray?.splice(i, 1)"
                      >
                        <VIcon>mdi-delete</VIcon>
                        حذف
                      </VBtn>
                    </VCol>
                  </VRow>
                </template>
              </VExpansionPanelTitle>
              <VExpansionPanelText class="my-2">
                <ContainerForm
                  v-if="selectedTab === 0"
                  v-model="modifyArray![i]"
                  is-manifest
                />
                <CarFormVue
                  v-if="selectedTab === 1"
                  v-model="modifyArray![i]"
                />
                <GoodsFormVue
                  v-if="selectedTab === 2"
                  v-model="modifyArray![i]"
                />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VForm>
      </VCardText>
    </VCard>
  </vdialog>
</template>
