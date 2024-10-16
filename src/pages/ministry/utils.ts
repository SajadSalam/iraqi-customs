export enum OperationType {
  Pending = 0,
  Certficate = 1,
  CustomClearance = 2,
  Check = 3,
  Manager = 4,
  TaxWriter = 5,
  TaxChecker = 6,
  TaxComplete = 7,
  MerchantView = 8,
  MerchantComplete = 9,
  Ports = 10,
  SecurityCheck = 11,
}
export const mainTabs = [
  {
    title: 'المعارض العراقية',
    image: '/steps/1.png',
    childern: [
      {
        title: 'شهادة استيراد',
        id: OperationType.Certficate,
      },
    ],
  },
  {
    title: 'الشركة العامة للنقل البحري',
    image: '/steps/2.png',
    childern: [
      {
        title: 'اصدار امر تسليم',
        id: OperationType.Certficate,
      },
    ],
  },
  {
    title: 'الهيأة العامة للكمارك',
    image: '/steps/3.png',
    childern: [
      {
        title: 'طلب و تدقيق التصريحة الكمركية',
        id: OperationType.CustomClearance,
      },
      {
        title: 'كشف البضاعة',
        id: OperationType.Check,
      },
      {
        title: 'دفع الوصل الكمركي',
        id: OperationType.Manager,
      },
      {
        title: 'اصدار الوصل الضريبي',
        id: OperationType.TaxWriter,
      },
      {
        title: 'دفع الوصل الضريبي',
        id: OperationType.TaxComplete,
      },

    ],
  },
  {
    title: 'هيأة المنافذ الحدودية',
    image: '/steps/4.png',
    childern: [
      {
        title: 'تدقيق المعاملة',
        id: OperationType.Ports,
      },
    ],
  },
  {
    title: 'النقاط الامنية',
    image: '/steps/5.png',
    childern: [
      {
        title: 'فحص البضاعة',
        id: OperationType.SecurityCheck,
      },
    ],
  },

]
export const tabs = [
  {
    title: 'شهادة استيراد',
    id: OperationType.Certficate,
    iconSuccess: 'mdi-file',
    isValid: true,
  },
  {
    title: 'تصريح كمركية',
    id: OperationType.CustomClearance,
    iconSuccess: 'mdi-book',
    isValid: true,
  },
  {
    title: 'فحص البضائع',
    id: OperationType.Check,
    iconSuccess: 'mdi-check',
    isValid: true,
  },
  {
    title: 'دفع الكمرك',
    id: OperationType.Manager,
    iconSuccess: 'mdi-dollar',
    isValid: true,
  },
  {
    title: 'احتساب الضريبة',
    id: OperationType.TaxWriter,
    iconSuccess: 'mdi-calculator',
    isValid: true,
  },
  {
    title: 'التحقق من الضريبة',
    id: OperationType.TaxChecker,
    iconSuccess: 'mdi-search',
    isValid: true,
  },
  {
    title: 'دفع الضريبة',
    id: OperationType.TaxComplete,
    iconSuccess: 'mdi-barcode-scan',
    isValid: true,
  },
  {
    title: 'فحص البضائع من المنافذ',
    id: OperationType.MerchantView,
    iconSuccess: 'mdi-ban',
    isValid: true,
  },
  {
    title: 'طلب تصريحة خروج',
    iconSuccess: 'mdi-briefcase',
    id: OperationType.MerchantComplete,
    isValid: true,
  },
  {
    title: 'فحص البضاعة من قبل النقاط الامنية',
    iconSuccess: 'mdi-shield',
    id: OperationType.Ports,
    isValid: true,
  },
  {
    iconSuccess: 'mdi-verified',
    title: 'تم تخليص البضاعة',
    id: OperationType.SecurityCheck,
    isValid: true,
  },
]
