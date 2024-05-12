<script setup lang="ts">
import _ from 'lodash'
import type { SelectableFieldType } from './types'

import type { Response } from '@/models/Response'
import swAxios from '@/plugins/sw-axios'
import { useDependStore } from '@/stores/DependStore'
import axios from '@axios'

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:objectValue', 'update:refresh'])
const dependStore = useDependStore()
const isLoading = ref<boolean>(false)
const searchInput = ref<string>('')
interface Props {
  itemValue: string
  itemLabel: string
  items?: SelectableFieldType[]
  label?: string
  modelValue?: string | SelectableFieldType
  getUrl?: string
  dependOn?: string
  rules?: any[]
  multiple?: boolean
  dependsOnValue?: any[]
  fetchOnSearch?: boolean
  subTitleLabel?: string
  searchKey?: string
  exclude?: string[]
  excludeKey?: string
  objectValue?: any
  refresh?: boolean
  pushToList?: any
  sw?: boolean
}
const itemsa = ref([])
const getUrl = computed(() => props.getUrl)

const refresh = computed({
  get() {
    return props.refresh
  },
  set(val) {
    emit('update:refresh', val)
  },
})

const itemsProps = computed({
  get: () => {
    if (!getUrl.value)
      return props.items

    return itemsa.value
  },
  set: value => {
    itemsa.value = value
  },
})

const pushToList = computed(() => props.pushToList)
const searchKey = ref(props.searchKey)
const fetchOnSearch = ref(true)
const exclude = computed(() => props.exclude)
const excludeKey = computed(() => props.excludeKey)
const itemValue = computed(() => props.itemValue)
const itemLabel = computed(() => props.itemLabel)
const subTitleLabel = computed(() => props.subTitleLabel || null)

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]

const getData = async () => {
  if (getUrl.value) {
    try {
      isLoading.value = true
      let params = {
        deleted: false,
        take: 20,
        skip: 0,
      }
      if (props.dependOn) {
        params = {
          [props.dependOn]: dependStore.dependValue,
          deleted: false,
          take: 20,
          skip: 0,
        }
      }
      if (props.dependsOnValue) {
        props.dependsOnValue.forEach((item: any) => {
          params[item.name] = item.value
        })
      }
      params[searchKey.value] = searchInput.value
      params.text = searchInput.value
      if (!props.sw) {
        const { data } = await axios.get<Response<SelectableFieldType>>(getUrl.value, {
          params,
        })

        itemsProps.value = data.result.data
      }
      else {
        const { data } = await swAxios.get<Response<SelectableFieldType>>(getUrl.value, {
          params,
        })

        itemsProps.value = data.data
      }
      const selectedItem = itemsProps.value?.find(v => v[itemValue.value] === modelValue.value)

      if (exclude.value && excludeKey.value) {
        console.log('exclude', exclude)

        itemsProps.value = itemsProps?.value.filter(item => exclude.value && excludeKey.value ? !exclude.value.includes(item[excludeKey.value]) : true)
      }
      if (modelValue.value) {
        const isExist = itemsProps.value?.find(v => v[itemValue.value] === modelValue.value)
        if (!isExist)
          itemsProps.value.push(selectedItem)
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      isLoading.value = false
    }
  }
}

const modelValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
    emit('update:objectValue', itemsProps.value?.find(v => v[itemValue.value] === value))
  },
})

const isDisabled = computed(() => {
  if (!modelValue.value && props.dependOn)
    return !dependStore.dependValue
  else return false
})

onMounted(() => {
  if (isDisabled.value)
    return

  if (!props.dependOn)
    getData()

  if (!props.searchKey)
    searchKey.value = props.itemLabel
})
watchDeep(
  () => props,
  () => {
    if (!props.searchKey)
      searchKey.value = props.itemLabel
  },
)
watch(
  () => dependStore.dependValue,
  () => {
    if (props.dependOn)
      getData()
  },
)
watchDebounced(
  () => searchInput.value,
  () => {
    if (fetchOnSearch.value)
      getData()
  },
  { debounce: 500 },
)
watch(modelValue, async () => {
  if (exclude.value && excludeKey.value)
    itemsProps.value = itemsProps?.value.filter(item => exclude.value && excludeKey.value ? !exclude.value.includes(item[excludeKey.value]) : true)

  // find object value
  // const item = itemsProps.value?.find(v => v[itemValue.value] === modelValue.value)

  // if (isNullOrUndefined(item)) {
  //   const res = await axios.get(`${getUrl.value}/${modelValue.value}`)

  //   itemsProps.value?.push(res.data.result)
  // }
})

watch(refresh, val => {
  if (val) {
    getData()
    refresh.value = false
  }
})
watch(() => getUrl.value, () => {
  if (getUrl.value)
    getData()
})

watch(pushToList, val => {
  if (val) {
    const isExist = itemsProps.value?.find(v => v[itemValue.value] === val[itemValue.value])
    if (!isExist)
      itemsProps.value?.push(val)

    // itemsProps.value?.push(val)
  }
})
</script>

<template>
  <div
    class="app-select flex-grow-1"
    :class="$attrs.class"
  >
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-high-emphasis"
      :text="label"
    />
    <AppAutocomplete
      v-model="modelValue"
      v-model:search="searchInput"
      :loading="isLoading"
      variant="outlined"
      :items="itemsProps"
      :item-value="itemValue"
      :rules="rules"
      no-data-text="لا يوجد بيانات"
      :multiple="multiple"
      :chips="multiple"
      :item-title="itemLabel"
      :disabled="isDisabled"
      clearable
    >
      <template #item="{ props, item }">
        <VListItem
          v-bind="props"
          :title="itemLabel !== '*' ? _.get(item.raw, itemLabel) : ''"
        >
          <VListItemSubtitle v-if="!hasSlot('subtitle')">
            {{ _.get(item.raw, subTitleLabel) }}
          </VListItemSubtitle>
          <VListItemSubtitle v-else>
            <slot
              name="subtitle"
              :item="item.raw"
            />
          </VListItemSubtitle>
        </VListItem>
      </template>

      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
    </AppAutocomplete>
  </div>
</template>
