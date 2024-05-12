import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import { DeliveryOrderStatusEnum, PayStatusEnum } from '@/constants/enums'

export const filter: TableField[] = [
  {
    key: 'number',
    label: 'رقم الامر',
    create: false,
    hideInTable: true,
    filterable: true,
    isMainFilter: true,
    field: {
      type: FieldType.Number,
    },
  },

  {
    key: 'customerId',
    label: 'المستفيد',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Customers',
        itemLabel: 'fullname',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'customerAssigneeId',
    label: 'المستفيد المتنازل له',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Customers',
        itemLabel: 'fullname',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'agentId',
    label: 'المخلص',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Customers',
        itemLabel: 'fullname',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'terminalId',
    label: 'الرصيف',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/DepartmentTerminal',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'portId',
    label: 'الميناء',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Port',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'tripId',
    label: 'الرحلة',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Trip',
        itemLabel: 'tripNumber',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'isCorrectName',
    label: 'تصحيح الاسم',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
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
    key: 'fromDeliveryDate',
    label: 'من تاريخ التسليم',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'toDeliveryDate',
    label: 'الى تاريخ التسليم',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'status',
    label: ' الحالة',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: DeliveryOrderStatusEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'payStatus',
    label: ' حالة الدفع',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: PayStatusEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
]
