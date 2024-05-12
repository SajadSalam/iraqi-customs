import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import { TripScheduleStatusEnum, statusEnumTrip } from '@/constants/enums'

export const shown: TableField[] = [
  {
    key: 'status',
    label: 'الحالة',
    create: false,
    hideInTable: true,
  },
  {
    key: 'steamshipAgent',
    label: 'الوكيل',
    create: false,
    cardViewCols: 4,
  },

  {
    key: 'financialYear',
    label: 'السنة المالية',
    create: false,
    icon: 'mdi-calendar',
    cardViewCols: 4,
  },

  {
    key: 'ship',
    label: 'الباخرة',
    create: false,
    cardViewCols: 4,
    icon: 'mdi-ship-wheel',
  },
  {
    key: 'weightImport',
    label: 'وزن الاستيراد',
    create: false,
    icon: 'mdi-weight',
  },
  {
    key: 'weightExport',
    label: 'وزن التصدير',
    create: false,
    icon: 'mdi-weight',
  },
  {
    key: 'arrivalDate',
    label: 'تاريخ الوصول',
    create: false,
    icon: 'mdi-calendar-arrow-left',
  },
  {
    key: 'exitDate',
    label: 'تاريخ المغادرة',
    create: false,
    icon: 'mdi-calendar-arrow-right',
  },
]

export const create: TableField[] = [
  {
    key: 'tripNumber',
    label: 'رقم الرحلة',
    create: true,
    filterable: true,
    isMainFilter: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'arrivalDate',
    label: 'تاريخ الوصول',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Date,
    },
  },
  {
    key: 'shipId',
    label: 'الباخرة',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,

      options: {
        haveDependOn: true,
        getURL: '/ship',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'steamshipAgentId',
    label: 'وكيل الباخرة',
    create: false,
    hideInTable: true,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/Ship/:id/steamship-agents',
        itemLabel: 'fullName',
        itemValue: 'id',
        dependOn: 'shipId',
        dependValue: 'id',
      },
    },
  },
  {
    key: 'trailerShipId',
    label: 'جزء الباخرة',
    hideInTable: true,
    filterable: true,
    create: false,
    field: {
      cols: 6,
      defualtValue: null,
      isHidden: true,
      type: FieldType.Select,
      options: {
        getURL: '/ship?shapeType=2',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },

]
export const additonal: TableField[] = [
  {
    key: 'portId',
    label: 'الميناء',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Port',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'entryDate',
    label: 'تاريخ الدخول للميناء',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Date,
    },
  },
  {
    key: 'terminalId',
    label: 'الرصيف',
    hideInTable: true,
    create: true,
    field: {
      cols: 4,
      type: FieldType.Select,
      dependsOn: 'portId',
      options: {
        getURL: '/DepartmentTerminal',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'secondLandingTerminalId',
    label: 'الرصيف الثاني',
    hideInTable: true,
    create: true,
    field: {
      dependsOn: 'portId',
      cols: 4,
      type: FieldType.Select,
      options: {
        getURL: '/DepartmentTerminal',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'landingDate',
    label: 'تاريخ الرسو',
    hideInTable: true,
    create: true,
    field: {
      cols: 4,
      type: FieldType.Date,
    },
  },
]
export const filter: TableField[] = [
  {
    key: 'portId',
    label: 'الميناء',
    hideInTable: true,
    filterable: true,
    create: false,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/Port',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'terminalId',
    label: 'الرصيف',
    hideInTable: true,
    filterable: true,
    create: false,
    field: {
      cols: 6,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        getURL: '/DepartmentTerminal',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'steamshipAgentId',
    label: 'الوكيل',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/user?roleId=3',
        itemLabel: 'fullName',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'officeId',
    label: 'المكتب',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        getURL: '/Office',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'fromWeightImport',
    label: 'من وزن الاستيراد',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: 'toWeightImport',
    label: 'إلى وزن الاستيراد',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: 'fromWeightExport',
    label: 'من وزن التصدير',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: 'toWeightExport',
    label: 'إلى وزن التصدير',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Number,
    },
  },
  {
    key: 'status',
    label: ' الحالة ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: statusEnumTrip,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'scheduleStatus',
    label: ' حالة الرحلة ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Select,
      options: {
        items: TripScheduleStatusEnum,
        itemLabel: 'arName',
        itemValue: 'value',
      },
    },
  },
  {
    key: 'fromArrivalDate',
    label: ' من تاريخ الوصول ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'toArrivalDate',
    label: ' الى تاريخ الوصول ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'fromExitDate',
    label: ' من تاريخ الخروج ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
  {
    key: 'toExitDate',
    label: ' الى تاريخ الخروج ',
    create: false,
    hideInTable: true,
    filterable: true,
    field: {
      type: FieldType.Date,
    },
  },
]
