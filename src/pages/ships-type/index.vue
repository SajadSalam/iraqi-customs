<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import type { ApiUrls } from "@/models/apiUrls";

const urls: ApiUrls = {
  get: "/ShipType?deleted=false",
  delete: "/ShipType",
  create: "/ShipType",
  update: "/ShipType",
};

const tableFields: TableField[] = [
  {
    key: "name",
    label: "نوع الباخرة",
    create: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
];
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="انواع البواخر"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #cardData="{ item }"> </template>
  </AppTable>
</template>

<style lang="" scoped></style>
