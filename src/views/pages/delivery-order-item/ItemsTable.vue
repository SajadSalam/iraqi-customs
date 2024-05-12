<script setup lang="ts">
import { isObject } from 'lodash'
import GoodTypeDialog from '../e-manifest/GoodTypeDialog.vue'
import ManifestProductDialog from '../manifest/ManifestProductDialog.vue'
import { CarHeaders, ContainerHeaders, GoodsHeaders } from './constants'
import { Tabs } from './types'
import { getEnum, typeStatus } from '@/constants/enums'
import { useManifestStore } from '@/stores/ManifestStore'
import { useUserStore } from '@/stores/UserStore'
import CarFilters from '@/views/filters/CarFilters.vue'
import ContainerFilter from '@/views/filters/ContainerFilter.vue'
import GoodTypeFilters from '@/views/filters/GoodTypeFilters.vue'
import type { ContainerFiltersType } from '@/views/filters/types'
import Attachments from '@/views/pages/manifest/attachments.vue'
import axios from '@axios'

const props = defineProps<Props>()
const emit = defineEmits(['refresh', 'filters'])
const userStore = useUserStore()
const manifestStore = useManifestStore()
interface Props {
  data: any[] | null
  loading: boolean
  tab: Tabs
  exludeKeys?: string[]
  hasFilter?: boolean
  customerId?: string
  hasOperation?: boolean
}
const customerId = computed(() => props.customerId)
const hasFilter = computed(() => props.hasFilter)
const data = computed(() => props.data ?? [])
const loading = computed(() => props.loading)
const tab = computed(() => props.tab)

const filters = ref<ContainerFiltersType>({
  customerId: null,
  hasDeliveryOrder: false,
  customerName: null,
  policaNumber: null,
  containerNumber: null,
  containerSize: null,
  containerWeightFrom: null,
  containerWeightTo: null,
  containerType: null,
  containerState: null,
  fillStatus: null,
  containerLine: null,
  carWeightFrom: null,
  carWeightTo: null,
  carBillLading: null,
  carType: null,
  carBrand: null,
  goodsTypeId: null,
  carModel: null,
  carColor: null,
  carYear: null,
})

const headersWithExludeKeys = computed(() => {
  let headers: any[] = []
  if (tab.value === Tabs.Cars)
    headers = CarHeaders

  else if (tab.value === Tabs.Containers)
    headers = ContainerHeaders

  else if (tab.value === Tabs.Goods)
    headers = GoodsHeaders

  if (props.exludeKeys)
    headers = headers.filter(header => !props.exludeKeys?.includes(header.key))

  if (props.hasOperation)
    headers.push({ label: 'العمليات', key: 'operations' })

  return headers
})

const slots = useSlots()

const hasSlot = (key: string) => {
  return slots[key] !== undefined
}

const slotedHeaders = computed(() => {
  return headersWithExludeKeys.value.filter(header => hasSlot(header.key) || hasSlot(`header-${header.key}`))
})

function openProduct(item: any) {
  manifestStore.setproductManifestDialog(true)
  manifestStore.setDataProductManifest(item.id)
}
watchDeep(() => filters.value, () => {
  console.log('test')

  emit('filters', filters.value)
})

const editGoodType = (item: any) => {
  manifestStore.setGoodTypeDialog(true)
  manifestStore.setDataGoodType(item.id)
}

const showFilters = ref(false)

const openAttachments = (item: any) => {
  manifestStore.setEditId(item)
  manifestStore.setAttachmentDialog(true)
  console.log(item)
}

// onMounted(() => {
//   filters.value.customerId = customerId.value ?? null
// })

const hasDeliveryOrderItems = [
  { label: 'نعم', value: true },
  { label: 'لا', value: false },
]

const updateTypeStatus = (item: any, status: number) => {
  item.typeStatus = status
  axios.put('/Container/type-status', {
    ids: [item.id],
    typeStatus: status,
  })
}

const handleUpdateFilters = (newFilters: ContainerFiltersType) => {
  // update only updated properties
  for (const key in newFilters) {
    if (newFilters[key] !== filters.value[key])
      filters.value[key] = newFilters[key]
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-center my-2">
      <slot name="before-filters" />
      <VSpacer />
      <VBtn
        :class="{ 'd-none': !hasFilter }"
        @click="showFilters = !showFilters"
      >
        <VIcon>
          {{ showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </VIcon>
        <span>
          {{ showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر' }}
        </span>
      </VBtn>
    </div>
    <VSlideYTransition>
      <VRow
        :class="{ 'd-none': !showFilters }"
        class="mb-2"
      >
        <VCol
          cols="12"
          md="3"
        >
          <AppTextField
            v-model="filters.customerName"
            label="اسم المستفيد"
            outlined
            clearable
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <AppSelectField
            v-model:model-value="filters.customerId"
            get-url="/customers"
            item-label="fullname"
            item-value="id"
            label="المستفيد"
          />
        </VCol>
        <ContainerFilter
          v-if="tab === Tabs.Containers"
          @update:filters="handleUpdateFilters"
        />
        <CarFilters
          v-if="tab === Tabs.Cars"
          @update:filters="handleUpdateFilters"
        />
        <GoodTypeFilters
          v-if="tab === Tabs.Goods"
          @update:filters="handleUpdateFilters"
        />
      </VRow>
    </VSlideYTransition>
  </div>
  <StaticTable
    v-if="data.length > 0"
    :headers="headersWithExludeKeys"
    :data="data"
    :loading="loading"
  >
    <template #header-select>
      <slot name="header-select" />
    </template>
    <template
      v-for="header in slotedHeaders"
      #[header?.key]="{ item, index }"
    >
      <slot
        :name="header.key"
        :header="header"
        :item="item"
        :index="index"
      />
    </template>
    <template #typeStatus="{ item }">
      <VMenu>
        <template #activator="{ on, props }">
          <VChip
            :color="getEnum(typeStatus, item.typeStatus).color"
            v-bind="props"
            v-on="on"
          >
            <VIcon>mdi-chevron-down</VIcon>

            {{ getEnum(typeStatus, item.typeStatus).arName }}
          </VChip>
        </template>
        <VList>
          <VListItem
            v-for="status in typeStatus"
            :key="status.value"
            @click="updateTypeStatus(item, status.value)"
          >
            <VListItemTitle>
              {{ status.arName }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </template>
    <template #containerState="{ item }">
      <VChip :color="item.containerState === 2 ? 'primary' : 'error'">
        {{ item.containerState === 2 ? 'غير خطرة' : 'خطرة' }}
      </VChip>
    </template>
    <template #isDamage="{ item }">
      <VChip :color="item.isDamage ? 'error' : 'success'">
        {{ item.isDamage ? 'متضرر' : 'سليم' }}
      </VChip>
    </template>
    <template #goodsType="{ item }">
      <span v-if="item.goodsType">
        {{ isObject(item.goodsType) ? item.goodsType.name : item.goodsType }}
      </span>
      <br v-if="item.goodsType">
      <VBtn
        v-if="userStore.havePermission('Manifest-UpdateGoodsType') && tab === Tabs.Goods"
        size="small"
        rounded="xl"
        color="primary"
        @click="editGoodType(item)"
      >
        <VIcon>mdi-update</VIcon>
        تحديث نوع البضاعة
      </VBtn>
    </template>
    <template #product="{ item }">
      <VBtn
        v-if="userStore.havePermission('Container-GetContainerItems')"
        icon
        variant="tonal"
        size="meduim"
        class="pa-2"
        @click.stop="openProduct(item)"
      >
        <VIcon>mdi-eye</VIcon>
      </VBtn>
    </template>
    <template #actions=" { item }">
      <VBtn
        v-if="userStore.havePermission('ManifestItemAttachment-Create')"
        color="primary"
        block
        @click="openAttachments(item)"
      >
        <VIcon>mdi-attachment-check</VIcon>
        اضافة المستندات
      </VBtn>
    </template>
  </StaticTable>
  <VAlert
    v-else-if="!loading"
    type="error"
    variant="outlined"
    border="left"
    class="ma-5"
    elevation="2"
  >
    لا يوجد بيانات
  </VAlert>

  <GoodTypeDialog @refresh="emit('refresh')" />
  <ManifestProductDialog />
  <Attachments />
</template>

<style lang="scss">
@import "@styles/styles";

.table-data-row {
  * {
    z-index: 1;
  }
}

#header-operations {
  position: sticky;
  z-index: 22;
  background-color: $secondary;
  inset-inline-end: 0;
}

#data-operations {
  position: sticky;
  z-index: 22 !important;
  background: $secondary;
  inset-inline-end: 0;
}

.v-theme--light {
  #data-operations {
    background: white;
  }
}
</style>
