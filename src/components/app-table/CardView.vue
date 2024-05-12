<script setup lang="ts">
import _ from 'lodash'
import type { TableField } from './types'
import { isEmpty } from '@/@core/utils'
import navigations from '@/navigation/vertical'

const props = defineProps<Props>()

const routes = useRoute()

interface Props {
  item: any
  fields: TableField[]
  edit: (item: any) => void
  deleteItem: (id: string | number) => void
  hideDelete?: boolean
  hideEdit?: boolean
  haveActions?: boolean

}
const item = ref(props.item)
const fields = ref(props.fields)
const mainField = ref(fields.value.find(v => v.isMain) ?? fields.value[0])

watch(() => props.fields, () => {
  item.value = props.item
  mainField.value = fields.value.find(v => v.isMain) ?? fields.value[0]
})
watch(() => props.item, () => {
  item.value = props.item
})

const findRoute = (name: string, navs: any[]) => {
  for (const r of navs) {
    if (r.children) {
      const found = findRoute(name, r.children)
      if (found)
        return found
    }
    else {
      if (r.to.name === name)
        return r
    }
  }

  return null
}

const currentRoute = ref(findRoute(routes.name, navigations))

onMounted(async () => {
  currentRoute.value = findRoute(routes.name, navigations)
})

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
function isDate(val: any) {
  return Object.prototype.toString.call(val) === '[object Date]'
}
</script>

<template>
  <!-- {{ currentRoute.icon.icon }} -->
  <VCard flat>
    <VCardTitle
      class="d-flex   align-center   mb-0 rounded rounded-b-0 "
      style="background: rgba(169, 187, 213, 20%);"
    >
      <template v-if="!hasSlot('cardHeader')">
        <span class=" border rounded-circle ml-2 pa-2">

          <VIcon
            size="25"
            color="primary"
            :icon="currentRoute ? currentRoute.icon.icon : 'mdi-book'"
          />
        </span>
        <div class="d-flex flex-column align-s">
          <span>
            {{ mainField?.label }}
          </span>
          <h4
            v-if="_.get(item, mainField?.key)?.length > 30"
            class="text-black font-weight-bold"
          >
            <VTooltip
              max-width="500"
              :text="_.get(item, mainField?.key)"
            >
              <template #activator="{ props }">
                <h4
                  v-bind="props"
                  class="text-black font-weight-bold"
                >
                  {{ _.get(item, mainField?.key)?.slice(0, 30) }}...
                </h4>
              </template>
            </VTooltip>
          </h4>
          <h4
            v-else
            class="text-black font-weight-bold"
          >
            {{ _.get(item, mainField?.key) }}
          </h4>
        </div>
        <slot
          name="cardTitle"
          :data="item"
        />
      </template>
      <slot
        name="cardHeader"
        :data="item"
      />
      <VSpacer />
      <VBtn
        v-if="!hideEdit"
        color="primary"
        size="small"
        icon
        class="rounded-circle"
        variant="tonal"
        @click.stop="edit(item)"
      >
        <VIcon>
          tabler-edit
        </VIcon>
      </VBtn>
      <VBtn
        v-if="!hideDelete"
        color="error"
        variant="tonal"
        size="small"
        class="rounded-circle mx-2"
        icon
        @click.stop="deleteItem(item.id)"
      >
        <VIcon>
          tabler-trash
        </VIcon>
      </VBtn>
      <slot
        name="headerBtns"
        :data="item"
      />
    </VCardTitle>
    <VDivider v-if="fields.filter(v => v.key != mainField.key && !v.hideInTable).length !== 0" />
    <VCardText class="pa-3 py-2">
      <VRow
        v-if="!hasSlot('cardData')"
        no-gutters
      >
        <template v-for="(field, i) in fields.filter(v => v.key != mainField.key && !v.hideInTable)">
          <VCol
            v-if="!field.hideInTable"
            :key="field.key"
            cols="12"
            class="py-1"
            :class="{
              // check if is not in last row
              'border-b': i < fields.length - 1,
            }"
            :md="field.cardViewCols ?? 6"
          >
            <div class="d-flex gap-2 align-center">
              <div class=" text-primary">
                <VIcon
                  size="25"
                  :icon="field.icon ?? 'tabler-info-circle'"
                />
              </div>
              <div class="d-flex flex-column">
                <span class="card-subtitle mb-1">
                  {{ field.label }}
                </span>
                <p class="font-weight-bold text-break">
                  <template v-if="!hasSlot(`field(${field.key})`)">
                    {{ isEmpty(_.get(item, field.field?.options?.takeFrom ?? field.key)) ? 'لا يوجد' : _.get(item,
                                                                                                             field.field?.options?.takeFrom ?? field.key) }}
                  </template>
                  <slot
                    v-else
                    :name="`field(${field.key})`"
                    :data="item"
                  />
                </p>
              </div>
            </div>
          </VCol>
        </template>
      </VRow>
      <slot
        name="cardData"
        :data="item"
      />
    </VCardText>
    <VCol
      v-if="hasSlot('footer')"
      cols="12"
      class="mb-3 position-relative"
      style="z-index: 99;"
    >
      <slot
        name="footer"
        :data="item"
      />
    </VCol>
  </VCard>
</template>
