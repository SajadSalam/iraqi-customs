import { FieldType } from "@/components/app-form/types";
import type { TableField } from "@/components/app-table/types";
import { DeliveryOrderStatusEnum, PayStatusEnum } from "@/constants/enums";

export const filter: TableField[] = [
  {
    key: "tripId",
    label: "الرحلة",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: "/trip",
        itemLabel: "tripNumber",
        itemValue: "id",
      },
    },
  },
  {
    key: "fromDate",
    label: "من تاريخ",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: "toDate",
    label: "الى تاريخ",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: "fromTotalTax",
    label: "من الضريبة الاجمالية",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: "fromTotalTax",
    label: "الى الضريبة الاجمالية",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: "fromPayDate",
    label: "من تاريخ الدفع",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: "toPayDate",
    label: "الى تاريخ الدفع",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: "steamshipAgentId",
    label: "وكيل الباخرة",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: "/user?roleId=3",
        itemLabel: "fullName",
        itemValue: "id",
      },
    },
  },
  {
    key: "shipId",
    label: "الباخرة",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: "/Ship",
        itemLabel: "name",
        itemValue: "id",
      },
    },
  },
  {
    key: "status",
    label: "الحالة",
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: DeliveryOrderStatusEnum,
        itemLabel: "arName",
        itemValue: "value",
      },
    },
  },

];
