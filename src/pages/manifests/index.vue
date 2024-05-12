<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'

import { useTableStore } from '@/stores/AppTableStore'
import { useManifestStore } from '@/stores/ManifestStore'
import ShipActionsDialog from '@/views/pages/manifest/ShipActionsDialog.vue'
import { GoodTypeEnum, StatusEnum } from '@/constants/enums'

const router = useRouter()
const manifestStore = useManifestStore()
function openShipActionDialog() {
  manifestStore.setShipActionDialog(true)
}
const tableStore = useTableStore()

const deleteItem = (id: string | number) => {
  tableStore.setDeleteDialog(true)
  tableStore.setDeletedItemId(id)
}

const urls: ApiUrls = {
  get: '/Manifests',
  delete: '/Manifests',
  create: '/Manifests',
  update: '/Manifests',
}

const tableFields: TableField[] = [
  {
    key: 'manifestNumber',
    label: 'رقم المنفست ',
    create: true,
    filterable: true,
    icon: 'mdi-numeric',
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Text,
    },
  },

  {
    key: 'portName',
    label: 'الميناء ',
    icon: 'tabler-anchor',
    create: true,
    filterable: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Text,
    },
  },

  {
    key: 'terminalName',
    label: 'الرصيف ',
    create: true,
    hideInTable: false,
    icon: 'tabler-barrier-block',
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Select,
      options: {
        items: [
          { name: 'سيارات', id: 1 },
          { name: 'حاويات', id: 2 },
          { name: 'بضائع', id: 3 },
        ],
      },
    },
  },
  {
    key: 'tripNumber',
    label: 'رقم الرحلة',
    create: true,
    icon: 'tabler-123',
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/trip',
        itemLabel: 'tripNumber',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'goodType',
    label: 'نوع البضاعة',
    icon: 'mdi-weight',
    create: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: GoodTypeEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'isImport',
    label: ' هل البضاعة مستوردة ؟',
    icon: 'mdi-weight',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: [
          { name: 'نعم', id: true },
          { name: 'لا', id: false },
        ],
      },
    },
  },
  {
    key: 'tripPortTerminalId',
    label: 'الرصيف',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/DepartmentTerminal',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'status',
    label: 'الحالة',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: StatusEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
]

const clicked = (item: any) => {
  router.push(`manifest-product/${item.id}/${item.goodType}`)
}
</script>

<template>
  <AppTable
    :on-row-click="clicked"
    :fields="tableFields"
    pagination
    title="Manifest"
    :urls="urls"
    disable-crud
    hide-edit
    have-actions
  >
    <template #goodType="{ item }">
      <VChip
        color="primary"
        label
        size="medium"
        class="py-1 px-2"
      >
        {{
          item.goodType == 2
            ? "حاويات"
            : item.goodType == 1
              ? "سيارات"
              : "بضاعة"
        }}
      </VChip>
    </template>
    <template #headerBtns="{ item }">
      <VChip
        label
        size="medium"
        class="py-1 px-2"
        :color="StatusEnum.find((x) => x.value === item.status)?.color"
      >
        {{ StatusEnum.find((x) => x.value === item.status)?.arName }}
      </VChip>
    </template>
  </AppTable>
  <ShipActionsDialog />
</template>
