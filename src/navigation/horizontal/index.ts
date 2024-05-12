import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'المعارض العراقية',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'طلبات شهادات الاستيراد',
    to: { name: 'pending-customers' },
    icon: { icon: 'tabler-a-b-2' },
    roles: ['Operator'],
  },
  {
    title: 'اوامر التسليم',
    to: { name: 'delivery-order' },
    icon: { icon: 'tabler-file' },
    roles: ['Operator', 'Customer'],
  },
  {
    title: 'التصريحات الكمركية',
    to: { name: 'custom-clearnace' },
    icon: { icon: 'tabler-lock' },
    roles: ['Admin',
      'Operator',
      'Customer',
      'Employee',
      'Check',
      'Checker',
      'Auditor',
      'Manager',
      'TaxWriter',
      'TaxChecker',
      'TaxComplete',
      'MerchantView',
      'MerchantComplete'],
  },
  {
    title: 'الرحلات والمنفست الالكتروني',
    to: { name: 'trips' },
    icon: { icon: 'tabler-ship' },
    roles: ['Admin'],

  },
] as HorizontalNavItems
