<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { ContainerTypeEnum } from '@/constants/enums'

const urls: ApiUrls = {
  get: '/ContainerInfo',
  delete: '/ContainerInfo',
  create: '/ContainerInfo',
  update: '/ContainerInfo',
}

const tableFields: TableField[] = [
  {
    key: 'number',
    label: 'رقم الحاوية ',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'size',
    label: 'حجم الحاوية ',
    create: true,
    icon: 'mdi-ruler',
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Number,

    },
  },
  {
    key: 'weight',
    label: 'وزن الحاوية ',
    icon: 'mdi-weight',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: 'containerType',
    label: 'نوع الحاوية ',
    icon: 'mdi-ship-wheel',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Select,
      options: {
        items: ContainerTypeEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'rfid',
    label: 'RFID',
    create: true,
    icon: 'mdi-id-card',
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="الحاويات"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #containerType="{ item }">
      <VChip color="primary">
        {{ ContainerTypeEnum.find((x) => x.value === item.containerType)?.arName }}
      </VChip>
    </template>
  </AppTable>
</template>

<style lang="" scoped>

</style>
