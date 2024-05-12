import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'الرئيسية',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'تقرير المكاتب',
    to: { name: 'office-report' },
    icon: { icon: 'mdi-chart-box-outline' },
    permission: 'DeliveryOrder-statistics-offices',
  },
  {
    title: 'المستخدمين',
    icon: { icon: 'tabler-file' },
    children: [
      {
        title: 'شركات النقل',
        to: { name: 'trans-company' },
        icon: { icon: 'tabler-truck' },
        permission: 'User-GetUsers',
      },
      {
        title: 'المستفيد',
        to: { name: 'customer' },
        icon: { icon: 'tabler-user' },
        permission: 'Customer-GetCustomers',
      },
      {
        title: 'وكيل الباخرة',
        to: { name: 'ship-agent' },
        icon: { icon: 'tabler-accessible' },
        permission: 'User-GetUsers',
      },
      {
        title: 'موظفين المكتب',
        to: { name: 'office-manager' },
        icon: { icon: 'tabler-brand-office' },
        permission: 'User-GetUsers',
      },

    ],
  },

  {
    title: 'اوامر التسليم',
    permission: 'DeliveryOrder-GetDeliveryOrders',
    children: [
      {
        title: 'اوامر التسليم',
        to: { name: 'delivery-order' },
        icon: { icon: 'tabler-file-search' },
        permission: 'DeliveryOrder-GetDeliveryOrders',
      },
      {
        title: 'اضافة امر تسليم',
        to: { name: 'delivery-order-add' },
        icon: { icon: 'tabler-box' },
        permission: 'DeliveryOrder-Create',
      },
    ],
  },
  {
    title: 'اوامر التصدير',
    permission: 'DeliveryOrder-GetDeliveryOrders',

    children: [
      {
        title: 'اوامر التصدير',
        to: { name: 'uploading-orders' },
        icon: { icon: 'tabler-file-search' },
        permission: 'DeliveryOrder-GetDeliveryOrders',
      },
      {
        title: 'اضافة امر التصدير',
        to: { name: 'uploading-orders-add' },
        permission: 'DeliveryOrder-Create',
        icon: { icon: 'tabler-box' },
      },
    ],
  },

  {
    title: 'الرحلات',
    icon: { icon: 'tabler-file' },
    children: [
      {
        title: 'الرحلات',
        to: { name: 'trips' },
        icon: { icon: 'tabler-speedboat' },
        permission: 'Trip-GetTrips',
      },
      {
        title: 'تصحيح الكلمات',
        to: { name: 'words-correction' },
        icon: { icon: 'tabler-abc' },
        permission: 'WordCorrection-GetWordCorrections',
      },
      {
        title: 'المنفست الالكتروني',
        to: { name: 'e-manifest' },
        icon: { icon: 'tabler-file-search' },
        permission: 'Manifest-GetManifests',
      },
      {
        title: 'الحاويات',
        to: { name: 'manifest-containers' },
        icon: { icon: 'tabler-box' },
        permission: 'Container-GetContainers',
      },
      {
        title: 'المنفست',
        to: { name: 'manifests' },
        icon: { icon: 'tabler-report-money' },
        permission: 'Manifest-GetManifests',
      },
      {
        title: 'الاسماء الشائعة',
        to: { name: 'common-names' },
        icon: { icon: 'tabler-users' },
        permission: 'CustomerName-GetCustomerNames',
      },
    ],
  },
  {
    title: 'المالية',
    icon: { icon: 'tabler-report-money' },
    children: [
      {
        title: 'خلاصة الحسابات',
        to: { name: 'account-summary' },
        icon: { icon: 'mdi-account-cash-outline' },
        permission: 'Accounts-GetAccounts',
      },
      {
        title: 'فواتير امر التسليم',
        to: { name: 'delivery-order-invoice' },
        icon: { icon: 'tabler-receipt-2' },
      },
      {
        title: 'الحسابات',
        to: { name: 'accounts' },
        icon: { icon: 'tabler-receipt-2' },
        permission: 'Accounts-GetAccounts',
      },
      {
        title: 'الايرادات المالية للمكتب',
        to: { name: 'invoice-balance-statement' },
        icon: { icon: 'tabler-receipt-2' },
      },

      {
        title: 'الفاتورة البحرية',
        to: { name: 'bill-freely' },
        icon: { icon: 'tabler-receipt-2' },
        permission: 'BillFreely-GetBillFreelys',
      },
      {
        title: 'صنف الاجور',
        to: { name: 'role-opreation' },
        icon: { icon: 'tabler-user-check' },
        permission: 'RoleOperation-GetRoleOperations',
      },
      {
        title: 'الأجور',
        to: { name: 'role-tax' },
        icon: { icon: 'tabler-file-dollar' },
        permission: 'RoleTax-GetRoleTaxes',
      },
      {
        title: 'التحويلات',
        to: { name: 'transactions' },
        icon: { icon: 'tabler-transfer' },
        permission: 'Transactions-GetTransactions',
      },
      {
        title: 'المستندات/صرف',
        to: { name: 'account-voucher-only' },
        icon: { icon: 'tabler-brand-cashapp' },
        permission: 'AccountVouchers-GetAccountVouchers',
      },
      {
        title: 'المستندات/قبض',
        to: { name: 'account-voucher-catch' },
        icon: { icon: 'tabler-arrow-back' },
        permission: 'AccountVouchers-GetAccountVouchers',
      },
      {
        title: 'المستندات/ تأمين',
        to: { name: 'account-voucher-insurance' },
        icon: { icon: 'tabler-receipt-tax' },
        permission: 'AccountVouchers-GetAccountVouchers',
      },
    ],
  },
  {
    title: 'ادارة النظام',
    icon: { icon: 'tabler-settings' },
    children: [
      {
        title: 'المكاتب',
        to: { name: 'offices' },
        icon: { icon: 'tabler-building-arch' },
      },
      {
        title: 'ادارة الصلاحيات',
        to: { name: 'roles' },
        icon: { icon: 'tabler-user-plus' },
        permission: 'Role-GetRoles',
      },
      {
        title: 'الموانئ',
        to: { name: 'ports' },
        icon: { icon: 'mdi-ship-wheel' },
        permission: 'Port-GetPorts',
      },
      {
        title: 'البواخر',
        to: { name: 'ships' },
        icon: { icon: 'tabler-ship' },
        permission: 'Ship-GetShips',
      },
      {
        title: 'انواع البواخر',
        to: { name: 'ships-type' },
        icon: { icon: 'tabler-users' },
        permission: 'ShipType-GetShipTypes',
      },
      {
        title: 'انواع البضائع',
        to: { name: 'type-goods' },
        icon: { icon: 'tabler-shopping-cart' },
        permission: 'GoodsType-GetGoodsTypes',
      },
      {
        title: 'الحاويات',
        to: { name: 'containers' },
        icon: { icon: 'tabler-box' },
        permission: 'ContainerInfo-GetCountries',
      },
      {
        title: 'الارصفة و الساحات',
        to: { name: 'berths' },
        icon: { icon: 'tabler-barrier-block' },
        permission: 'DepartmentTerminal-GetDepartmentTerminals',
      },
      {
        title: 'الدول',
        to: { name: 'countries' },
        icon: { icon: 'tabler-building-community' },
        permission: 'Country-GetCountries',
      },
      {
        title: 'السنة المالية',
        to: { name: 'financial-year' },
        icon: { icon: 'tabler-building-bank' },
        permission: 'FinancialYear-GetFinancialYears',
      },
    ],
  },
] as HorizontalNavItems
