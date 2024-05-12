<script setup lang="ts">
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import { ViewType } from '@/components/app-table/types'
import { GoodTypeEnum, StatusEnum } from '@/constants/enums.ts'
import type { ApiUrls } from '@/models/apiUrls'
import { baseURL } from '@/plugins/axios'
import { useTableStore } from '@/stores/AppTableStore'
import { useEManifestStore } from '@/stores/EmanifestStore'
import { useUserStore } from '@/stores/UserStore'
import AddItems from '@/views/pages/e-manifest/AddItems.vue'
import ItemsDialog from '@/views/pages/e-manifest/ItemsDialog.vue'
import ManifestDialog from '@/views/pages/e-manifest/ManifestDialog.vue'
import RecpictDilog from '@/views/pages/e-manifest/RecpictDilog.vue'

const userStore = useUserStore()
const EManifestStore = useEManifestStore()
const tableStore = useTableStore()

const urls: ApiUrls = {
  create: '/Manifests',
  delete: '/Manifests',
  get: '/Manifests',
  update: '/Manifests',
}

const fields: TableField[] = [
  {
    key: 'tripNumber',
    label: 'رقم الرحلة',
    create: false,
    disableFormat: true,
    field: {
      type: FieldType.Number,
      cols: 6,
    },
  },
  {
    key: 'manifestNumber',
    label: 'رقم المنفست',
    disableFormat: true,
    create: false,
    filterable: true,
    field: {
      type: FieldType.Number,
      cols: 6,
    },
  },
  {
    key: 'terminalId',
    label: ' الرصيف',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/DepartmentTerminal',
        id: 'id',
        name: 'name',
      },
    },
  },
  {
    key: 'portId',
    label: 'الميناء',
    create: false,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Port',
        id: 'id',
        name: 'name',
      },
    },
  },
  {
    key: 'portName',
    label: 'الميناء',
  },
  {
    key: 'terminalName',
    label: 'الرصيف',
  },
  {
    key: 'fileName',
    label: 'اسم الملف',
  },
  {
    key: 'goodType',
    label: 'نوع البضاعة',
    create: false,
    filterable: true,
    field: {
      type: FieldType.Select,
      cols: 6,
      options: {
        items: GoodTypeEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'isImport',
    label: 'نوع المنفست',
    create: false,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: [
          { name: 'استيراد', id: true },
          { name: 'تصدير', id: false },
        ],
      },
    },
  },

  {
    key: 'status',
    label: 'الحالة',
    create: false,
    filterable: true,
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
  {
    key: 'shipId',
    label: 'الباخرة',
    filterable: true,
    hideInTable: true,
    create: false,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Ship',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'tripId',
    label: 'رقم الرحلة',
    filterable: true,
    hideInTable: true,
    create: false,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Trip',
        itemLabel: 'tripNumber',
        itemValue: 'id',
      },
    },
  },
]

const openRecpictDialog = (item: any) => {
  EManifestStore.setRecpictDialog(true)
  EManifestStore.setManifest(item)
}

const openAddItemDialog = (item: any) => {
  EManifestStore.setManifest(item)
  EManifestStore.setAddItemDialog(true)
}
</script>

<template>
  <AppTable
    :fields="fields"
    :view-type="ViewType.Table"
    hide-view-type
    :urls="urls"
    pagination
    title="المنفيست الالكتروني"
    have-actions
    hide-delete
    hide-edit
    disable-crud
  >
    <template #isImport="{ item }">
      <VChip color="primary">
        {{ item.isImport ? "استيراد" : "تصدير" }}
      </VChip>
    </template>
    <template #headerActions>
      <VBtn
        v-if="userStore.havePermission('Manifest-Create')"
        color="warning"
        class="mx-2"
        @click="EManifestStore.setAddDialog(true, true)"
      >
        <VIcon
          class="ml-2"
          size="20"
        >
          tabler-file-type-xml
        </VIcon>
        إضافة منفيست XML
      </VBtn>
      <VBtn
        v-if="userStore.havePermission('Manifest-Create')"
        color="primary"
        @click="EManifestStore.setAddDialog(true)"
      >
        <VIcon class="ml-2">
          mdi-plus
        </VIcon>
        إضافة منفيست
      </VBtn>
    </template>
    <template #goodType="{ item }">
      <VChip
        color="primary"
        label
      >
        {{
          item.goodType === 2
            ? "حاويات"
            : item.goodType === 1
              ? "سيارات"
              : "بضاعة"
        }}
      </VChip>
    </template>
    <template #fileName="{ item }">
      <VCip color="primary">
        <a
          :href="baseURL + item.filePath"
          target="_blank"
          rel="noopener noreferrer"
        >{{ item.fileName }}</a>
      </VCip>
    </template>

    <template #status="{ item }">
      <VChip
        :color="StatusEnum.find((s) => s.value === item.status)?.color"
        label
      >
        {{ StatusEnum.find((s) => s.value === item.status)?.arName }}
      </VChip>
    </template>
    <template #actions="{ item }">
      <VBtn
        v-if="userStore.havePermission('Manifest-GetManifestItems')"
        color="primary"
        size="small"
        class="rounded-xl"
        @click="
          () => {
            EManifestStore.setManifest(item);
            EManifestStore.setItemsDialog(true);
          }
        "
      >
        <VIcon class="ml-2">
          mdi-eye
        </VIcon>
        معاينة الملف
      </VBtn>
      <VBtn
        v-if="item.status !== 2 && userStore.havePermission('Manifest-UpdateStatusManifest')"
        class="mr-1 rounded-xl"
        color="secondary"
        size="small"
        @click="
          () => {
            openRecpictDialog(item);
          }
        "
      >
        <VIcon class="ml-2">
          tabler-circle-check
        </VIcon>
        موافقة
      </VBtn>
      <VBtn
        v-if="item.status === 2"
        size="small"
        class="rounded-xl mx-1"
        color="warning"
        @click="openAddItemDialog(item)"
      >
        <VIcon>
          mdi-file-text-plus
        </VIcon>
        اضافة بيانات
      </VBtn>
    </template>
  </AppTable>
  <ManifestDialog @refresh="tableStore.setRefresh(true)" />
  <ItemsDialog />
  <RecpictDilog />
  <AddItems />
</template>
