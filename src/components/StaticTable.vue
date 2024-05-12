<script setup lang="ts">
import _ from 'lodash'

interface Header {
  label: string
  key: string
}
interface Props {
  headers: Header[]
  data: any[]
  loading: boolean
  onRowClick?: (item: any) => void
}
const props = defineProps<Props>()
const data = computed(() => props.data)
const isLoading = computed(() => props.loading)
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
  <VTable class="table">
    <thead>
      <tr>
        <template v-for="header in headers">
          <th
            v-if="!hasSlot(`header-${header.key}`)"
            :id="`header-${header.key}`"
            :key="header.key"
            :value="header.key"
            class="text-center"
          >
            {{ header.label }}
          </th>
          <th
            v-else
            :id="`header-${header.key}`"
            :key="`${header.key}slot`"
            :value="header.key"
            class="text-center"
          >
            <slot :name="`header-${header.key}`" />
          </th>
        </template>
      </tr>
    </thead>
    <template v-if="isLoading">
      <div class="d-flex justify-center align-center text-center pa-5">
        <p class="text-center">
          يتم التحميل ...
        </p>
      </div>
    </template>
    <template v-else-if="data.length < 1">
      <div class="d-flex justify-center align-center text-center pa-5">
        <p class="text-center">
          لا يوجد بيانات
        </p>
      </div>
    </template>
    <template v-else>
      <tbody>
        <tr
          v-for="(item, i) in data"
          :key="item.id"
          class="table-data-row"
          @click="onRowClick ? onRowClick(item) : undefined"
        >
          <td
            v-for="header in headers"
            :id="`data-${header.key}`"
            :key="header.key"
            class="text-center"
          >
            <template v-if="hasSlot(header.key)">
              <slot
                :name="header.key"
                :item="item"
                :index="i"
              />
            </template>
            <template v-else>
              <!-- check if  _.get(item, header.key) is long and show it only on hover -->
              <span v-if="_.get(item, header.key)?.length > 20">
                <!-- {{ _.get(item, header.key)?.slice(0, 20) }}... -->
                <VTooltip
                  max-width="500"
                  :text="_.get(item, header.key)"
                >
                  <template #activator="{ props }">
                    <span v-bind="props">{{ _.get(item, header.key)?.slice(0, 20) }}...</span>
                  </template>
                </VTooltip>
              </span>
              <span
                v-else
                class="d-inline-block"
              >
                {{ _.get(item, header.key) }}
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </template>
  </VTable>
</template>
