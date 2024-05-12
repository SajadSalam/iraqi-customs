import { phoneNumValidator, requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'

export const types = [
  {
    arName: ' وكيل الباخرة',
    name: 'SteamshipAgent',
    id: 1,
  },
  {
    name: 'JointOperatingCompany',
    arName: 'شركة التشغيل',
    id: 2,
  },
  {
    name: 'ShippingCompany',
    arName: 'شركة النقل',
    id: 3,
  },
  {
    name: 'Beneficiary',
    arName: 'المستفيد',
    id: 4,
  },
  {
    name: 'Insurer',
    arName: 'المؤمن',
    id: 5,
  },
  {
    name: 'Authorized',
    arName: 'مُصرّح',
    id: 6,
  },
  {
    name: 'Other',
    arName: 'أخرى',
    id: 7,
  },
]

export const tableFields: TableField[] = [

  {
    key: 'fullname',  
    label: 'الاسم',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'text',
    label: 'الاسم',
    hideInTable: true,
    filterable: true,
    isMainFilter: true,
    create: false,
    field: {
      cols: 6,  
      type: FieldType.Text,
    },

  },
  {
    key: 'phoneNumber',
    label: 'رقم الهاتف ',
    icon: 'mdi-phone',
    create: true,
    field: {
      cols: 6,
      validations: [phoneNumValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'customerType',
    label: 'نوع المستفيد',
    create: true,
    hideInTable: true,

    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Select,

      options: {
        valueFrom: 'customerType.title',
        items: types.map(type => ({
          name: type.arName,
          id: type.id,
        })),

      },
    },
  },
  {
    key: 'customerType.title',
    label: 'نوع المستفيد',
    icon: 'mdi-account',
    create: false,

  },
  {
    key: 'isGovernorate',
    label: 'هل هو محافظة ؟',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        items: [
          {
            name: 'نعم',
            id: true,
          },
          {
            name: 'لا',
            id: false,
          },
        ],
      },
    },
  },
  {
    key: 'address',
    label: 'العنوان',
    icon: 'mdi-map-marker',
    create: true,
    field: {
      cols: 6,
      type: FieldType.Text,
    },
  },
]
