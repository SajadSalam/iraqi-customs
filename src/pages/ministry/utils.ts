export enum OperationType {
  Pending = 0,
  Certficate = 1,
  CustomClearance = 2,
  Check = 3,
  Manager = 4,
  TaxWriter = 5,
  TaxChecker = 6,
  TaxComplete = 7,
  MerchantComplete = 8,
  Ports = 9,
  SecurityCheck = 10,
}
export const mainTabs = [
  {
    title: 'المعارض العراقية',
    image: '/steps/1.png',
    value: 0,
    activeWidth: '10%',
    childern: [
      {
        title: 'طلب شهادة استيراد',
        id: OperationType.Pending,
      },
      {
        title: 'شهادة استيراد',
        id: OperationType.Certficate,
      },
    ],
  },
  {
    title: 'الشركة العامة للنقل البحري',
    image: '/steps/2.png',
    value: 0,
    activeWidth: '30%',
    childern: [
      {
        title: 'اصدار امر تسليم',
        id: OperationType.CustomClearance,
      },
    ],
  },
  {
    title: 'الهيأة العامة للكمارك',
    image: '/steps/3.png',
    activeWidth: '55%',
    value: 0,
    childern: [
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
    title: 'المنافذ الحدودية',
    image: '/steps/4.png',
    value: 0,
    activeWidth: '75%',
    childern: [
      {
        title: 'تدقيق المعاملة',
        id: OperationType.MerchantComplete,
      },
    ],
  },
  {
    title: 'النقاط الامنية',
    image: '/steps/5.png',
    value: 0,
    activeWidth: '100%',
    childern: [
      {
        title: 'فحص البضاعة',
        id: OperationType.Ports,
      },
    ],
  },

]
export const tabs = [
  {
    title: 'طلب شهادة',
    id: OperationType.Pending,
    iconSuccess: 'mdi-file',
    isValid: true,
  },
  {
    title: 'شهادة استيراد',
    id: OperationType.Certficate,
    iconSuccess: 'mdi-file',
    isValid: true,
  },
  {
    title: 'تصريحة كمركية',
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
