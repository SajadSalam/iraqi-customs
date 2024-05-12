<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";

import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import type { ApiUrls } from "@/models/apiUrls";

const urls: ApiUrls = {
  get: "/country",
  delete: "/country",
  create: "/country",
  update: "/country",
};

const tableFields: TableField[] = [
  {
    key: "name",
    label: "الاسم",
    filterable: true,
    filterOptions: {
      type: FieldType.Text,
      modelValueKey: "text",
    },
    create: true,
    isMain: true,
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
    title="الدول"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <!-- <template #cardHeader="{ item }">
        <h4>
          <VIcon class="ml-2 rounded-pill bg-pri" icon="mdi-flag"></VIcon> {{ item.name }}
        </h4>
      </template> -->
    <template #cardData="{ item }"> </template>
  </AppTable>
</template>

<style lang="" scoped></style>
