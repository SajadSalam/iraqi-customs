<script setup lang="ts">
import _ from 'lodash'
import type { FieldTypes } from '../app-form/types'
import type { TableField } from './types'
import { ViewType } from './types'
import type { Response } from '@/models/Response'
import type { ApiUrls } from '@/models/apiUrls'
import swAxios from '@/plugins/sw-axios'
import { useTableStore } from '@/stores/AppTableStore'
import axios from '@axios'

import { formatDate } from '@/@core/utils/formatters'
import { useUserStore } from '@/stores/UserStore'

const props = defineProps<Props>()
const emit = defineEmits(['update:filterModel', 'update:data'])
const tableStore = useTableStore()
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]

interface Props {
  fields: TableField[]
  pagination: boolean
  haveActions?: boolean
  title: string
  addBtnText?: string
  urls?: ApiUrls
  removeCard?: boolean
  hideEdit?: boolean
  hideCreate?: boolean
  disableCrud?: boolean
  hideDelete?: boolean
  isSingle?: boolean
  filterModel?: object[]
  fakeData?: any[]
  hideHeader?: boolean
  formData?: boolean
  openForm?: () => void
  onRowClick?: (item: any) => void
  viewType?: ViewType
  hideViewType?: boolean
  sw?: boolean
}

const isLoading = ref(false)
const data = ref([])
const pagesCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const isFilterOpen = ref(false)
const viewType = ref<ViewType>(props.viewType ?? ViewType.Cards)
const { generalPermission } = useUserStore()

const permission = computed(() => {
  return props.urls?.create.replace('/', '')
})

const hideCreate = computed(() => {
  if (props.disableCrud)
    return true
  if (props.hideCreate)
    return true

  return !generalPermission(permission.value as string, 'create')
})

const hideDelete = computed(() => {
  if (props.disableCrud)
    return true
  if (props.hideDelete)
    return true

  return !generalPermission(permission.value as string, 'delete')
})

const hideEdit = computed(() => {
  if (props.disableCrud)
    return true
  if (props.hideEdit)
    return true

  return !generalPermission(permission.value as string, 'update')
})

const headers = computed(() => props.fields.map(field => {
  return {
    text: field.label,
    value: field.key,
    hideInTable: field.hideInTable,
  }
}))

const filterFields = ref(props.fields.filter(x => x.filterable).map(field => {
  return {
    field,
    hideInFilter: field.hideInFilter,
    value: field.field?.defualtValue ?? '',
  }
}))

tableStore.setTitle(props.title ?? 'الصفحة الرئيسية')
watch(() => filterFields.value, () => {
  currentPage.value = 1
  emit('update:filterModel', filterFields.value)
}, { deep: true })

const getData = async () => {
  isLoading.value = true
  try {
    data.value = []
    if (!props.fakeData) {
      const params = filterFields.value.reduce((acc, curr) => {
        if (curr.value)
          acc[curr.field.key] = curr.value

        return acc
      }, {} as any)

      const requestProvider = props.sw ? swAxios : axios

      const response = await requestProvider.get<Response<any>>(props.urls.get, {
        params: {
          ...params,
          take: pageSize.value,
          skip: (currentPage.value - 1),
        },
      })

      if (props.isSingle) { data.value = response.data as any }
      else {
        if (!props.sw)
          data.value = response.data.result.data as any
        else
          data.value = response.data.data as any
      }
      if (props.pagination) {
        if (!props.sw)
          pagesCount.value = response.data.result.count / pageSize.value
        else
          pagesCount.value = 1
      }
    }
    else {
      data.value = props.fakeData
    }
    emit('update:data', data.value)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(() => tableStore.refresh, val => {
  if (val) {
    getData()
    tableStore.setRefresh(false)
  }
})

const deleteItem = (id: string | number) => {
  tableStore.setDeleteDialog(true)
  tableStore.setDeletedItemId(id)
}

const openCreate = () => {
  tableStore.setFields(props.fields.filter(x => x.create).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  }))
  tableStore.setDialogTitle(props.addBtnText ?? 'اضافة')
  tableStore.setFormDialog(true)
  tableStore.setEdit(undefined)

  const initialData = tableStore.createFields.reduce((acc, curr) => {
    acc[curr.modelValueKey] = null

    return acc
  }, {} as any)

  tableStore.setInitialData(initialData)
}

const openEdit = item => {
  tableStore.setFields(props.fields.filter(x => x.create && !x.hideInEdit).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  }))
  tableStore.setDialogTitle(props.addBtnText ?? 'اضافة')
  tableStore.setEdit(item.id)

  tableStore.setFormDialog(true)

  const initialData = tableStore.createFields.reduce((acc, curr) => {
    if (curr.options?.valueFrom)

      acc[curr.modelValueKey as string] = _.get(item, curr.options?.valueFrom)

    else
      acc[curr.modelValueKey as string] = item[curr.modelValueKey as string]

    return acc
  }, {} as any)

  tableStore.setInitialData(initialData)
}

const resetFilters = () => {
  filterFields.value.forEach(field => {
    field.value = ''
  })
  getData()
}

const getSlottedFields = () => {
  return props.fields.filter(field => hasSlot(field.key))
}

onMounted(() => {
  getData()
  tableStore.setUrls(props.urls)
  emit('update:filterModel', filterFields.value)
})

const formatter = (input: string | number) => {
  if (!isNaN(Number(input)))
    return Number(input).toLocaleString()

  else if (!isNaN(Date.parse(input as string)))
    return formatDate(input as string)

  return input ?? 'لا يوجد'
}

const shouldApplyFormatting = header => {
  const field = props.fields.find(x => x.key === header.value)

  return !field?.disableFormat
}

const getValue = (item, header) => {
  return (header.takeFrom ? _.get(item, header.takeFrom) : _.get(item, header.value)) ?? 'لا يوجد'
}
</script>

<template>
  <VCard
    :loading="isLoading"
    class="pa-2 position-relative  transparent"
    flat
  >
    <VCardTitle
      v-if="!props.hideHeader"
      class="my-2 bg-white d-flex align-center"
      style="border-radius: 20px;"
    >
      <div
        v-if="!hideViewType"
        class="d-flex align-center view-type"
      >
        <VBtn
          v-if="!hideViewType"
          icon
          variant="text"
          class="border-e rounded-0"
          @click="viewType = ViewType.Cards"
        >
          <VIcon
            :color="viewType === ViewType.Cards ? 'primary' : 'secondary'"
            size="20"
          >
            mdi-cards-variant
          </VIcon>
        </VBtn>
        <VBtn
          v-if="!hideViewType"
          icon
          class="rounded-0"
          variant="text"
          @click="viewType = ViewType.Table"
        >
          <VIcon
            :color="viewType !== ViewType.Cards ? 'primary' : 'secondary'"
            size="20"
          >
            mdi-table
          </VIcon>
        </VBtn>
      </div>
      <VRow class="mx-2">
        <VCol
          v-for="filter in filterFields.filter(v => v.field.isMainFilter)"
          :key="filter.field.key"
          md="6"
          cols="12"
        >
          <AppField
            v-model="filter.value"
            :field="filter.field.field"
            :icon="filter.field.field?.icon"
            :placeholder="filter.field.label"
            is-filter
            @update:model-value="getData"
          />
        </VCol>
      </VRow>

      <VSpacer />
      <VBtn
        v-if="filterFields.length > 0"
        class="mx-2"
        :variant="isFilterOpen ? 'elevated' : 'text'"
        color="secondary"
        @click="isFilterOpen = !isFilterOpen"
      >
        <VIcon>
          mdi-filter
        </VIcon>
        فلتر
      </VBtn>
      <VBtn
        v-if="!hideCreate"
        color="primary"
        variant="tonal"
        @click="openCreate"
      >
        <VIcon>mdi-plus</VIcon>
        {{ addBtnText ?? 'اضافة' }}
      </VBtn>

      <slot name="headerActions" />
    </VCardTitle>
    <VSlideYTransition v-if="filterFields.length > 0">
      <VCard
        v-if="isFilterOpen"
        class="my-5"
      >
        <VCardTitle>
          الفلاتر
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VRow class="mt-2">
            <VCol
              v-for="(filter, index) in filterFields"
              :key="`filter${index}`"
              :class="{ 'd-none': filter.field.hideInFilter }"
              :cols="12"
              :md="3"
            >
              <AppField
                v-if="!hasSlot(`filter.${filter.field.key}`)"
                v-model="filter.value"
                :field="filter.field.field"
                :icon="filter.field.field?.icon"
                :label="filter.field.label"
                is-filter
                @update:model-value="getData"
              />
              <slot
                v-else
                :name="`filter.${filter.field.key}`"
                :filter="filter"
                :get-data="getData"
              />
            </VCol>
            <VCol cols="12">
              <div class="d-flex justify-end">
                <VBtn
                  variant="outlined"
                  color="primary"
                  @click="resetFilters"
                >
                  <VIcon>mdi-reload</VIcon>
                  اعادة تعيين الفلاتر
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VSlideYTransition>
    <!-- <VDivider class="my-1" /> -->
    <PerfectScrollbar
      :options="{ wheelPropagation: true, suppressScrollY: true }"
      class="h-100 w-100"
    >
      <VSlideXReverseTransition>
        <VTable
          v-if="viewType === ViewType.Table"
          class="table  mt-2"
        >
          <thead>
            <tr>
              <template v-for="header in headers">
                <th
                  v-if="!header.hideInTable"
                  :key="header.value"
                  :value="header.value"
                  class="text-center"
                >
                  {{ header.text }}
                </th>
              </template>
              <th
                v-if="haveActions"
                class="text-center"
              >
                الاجراءات
              </th>
            </tr>
          </thead>
          <template v-if="isLoading">
            <div class="d-flex justify-center align-center text-center pa-5">
              <p class="text-center">
                يتم التحميل ...
              </p>
            </div>
          </template>
          <template v-else>
            <tbody>
              <tr
                v-for="(item, i) in data"
                :key="item.id"
                @click="onRowClick ? onRowClick(item) : undefined"
              >
                <template v-for="header in headers">
                  <td
                    v-if="!header.hideInTable"
                    :key="header.value"
                    class="text-center"
                  >
                    <template v-if="hasSlot(header.value)">
                      <slot
                        :name="header.value"
                        :item="item"
                      />
                    </template>
                    <template v-else>
                      {{
                        shouldApplyFormatting(header)
                          ? formatter(getValue(item, header))
                          : getValue(item, header) }}
                    </template>
                  </td>
                </template>
                <td v-if="haveActions">
                  <div class="d-flex align-center justify-center">
                    <template v-if="haveActions">
                      <VBtn
                        v-if="!hideEdit"
                        color="warning"
                        size="small"
                        icon
                        class="rounded-circle"
                        @click="openEdit(item)"
                      >
                        <VIcon size="20">
                          tabler-edit
                        </VIcon>
                      </VBtn>
                      <VBtn
                        v-if="!hideDelete"
                        color="error"
                        size="small"
                        icon
                        class="rounded-circle mx-2"
                        @click="deleteItem(item.id)"
                      >
                        <VIcon size="20">
                          mdi-delete
                        </VIcon>
                      </VBtn>
                    </template>
                    <slot
                      name="actions"
                      :item="item"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </VTable>
        <div
          v-else-if="viewType == ViewType.Cards"
          class="mt-5"
        >
          <h4
            v-if="data.length <= 0"
            class="text-center"
          >
            لا توجد نتائج
          </h4>
          <VRow>
            <VCol
              v-for="(item, i) in data"
              :key="`card${i}`"
              cols="12"
              md="6"
            >
              <CardView
                v-if="!hasSlot('cards')"
                :hide-delete="hideDelete"
                :hide-edit="hideEdit"
                :item="item"
                :fields="fields"
                :edit="openEdit"
                :delete-item="deleteItem"
                @click.stop="onRowClick ? onRowClick(item) : undefined"
              >
                <template #cardTitle="{ data }">
                  <slot
                    name="cardTitle"
                    :item="data"
                  />
                </template>
                <template #headerBtns="{ data }">
                  <slot
                    name="headerBtns"
                    :item="data"
                  />
                </template>
                <template
                  v-for="field in getSlottedFields()"
                  #[`field(${field.key})`]="{ data }"
                >
                  <slot
                    :name="field.key"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('cardHeader')"
                  #cardHeader="{ data }"
                >
                  <slot
                    name="cardHeader"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('headerActions')"
                  #headerActions="{ data }"
                >
                  <slot
                    name="headerActions"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('footer')"
                  #footer="{ data }"
                >
                  <slot
                    name="footer"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('cardData')"
                  #cardData="{ data }"
                >
                  <slot
                    name="cardData"
                    :item="data"
                  />
                </template>
              </CardView>
            </VCol>
          </VRow>
          <slot
            name="cards"
            :data="data"
          />
        </div>
      </VSlideXReverseTransition>
    </PerfectScrollbar>

    <div class="d-flex align-end justify-end mt-5">
      <VPagination
        v-if="pagination"
        v-model="currentPage"
        :length="pagesCount"
        :total-visible="5"
        @update:model-value="getData"
      />
    </div>

    <DeleteConfirmDialog @success="getData" />
    <slot
      v-if="hasSlot('customForm')"
      name="customForm"
    />
    <FormDialog
      v-if="!hasSlot('customForm')"
      :urls="urls"
      :form-data="formData"
      @save="getData"
    />
  </VCard>
</template>gt
