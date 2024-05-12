<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import { ViewType } from "@/components/app-table/types";
import type { ApiUrls } from "@/models/apiUrls";
import { useRoleStore } from "@/stores/RoleStore";
import PermissionsDialog from "@/views/pages/roles/permissionDialog.vue";
import type { Role } from "@/views/pages/roles/types";

const urls: ApiUrls = {
  get: "/Role",
  delete: "/Role",
  create: "/Role",
  update: "/Role",
};

const tableFields: TableField[] = [
  {
    key: "name",
    label: "الاسم",
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: "number",
    label: "الرقم",
    create: false,
    hideInEdit: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  {
    key: "parentId",
    label: "الصلاحية الرئيسية",
    create: true,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: "/Role",
        itemLabel: "name",
        itemValue: "id",
      },
    },
  },
  // filters
  {
    key: "fromNumber",
    label: "من رقم",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
  {
    key: "toNumber",
    label: "الى رقم",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      type: FieldType.Number,
    },
  },
];

const roleStore = useRoleStore();

const openPermissionDialog = (item: Role) => {
  roleStore.setRole(item);
  roleStore.setPermissionDialog(true);
};
</script>

<template>
  <AppTable
    :fields="tableFields"
    :view-type="ViewType.Table"
    hide-view-type
    pagination
    title="ادارة الصلاحيات"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #actions="{ item }">
      <VBtn icon variant="text" @click="openPermissionDialog(item)">
        <VIcon icon="mdi-menu" />
      </VBtn>
    </template>
  </AppTable>
  <PermissionsDialog />
</template>
