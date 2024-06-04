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
    icon: 'file',
  },
  {
    title: 'تصريح كمركية',
    id: OperationType.CustomClearance,
    icon: 'book',
  },
  {
    title: 'فحص البضائع',
    id: OperationType.Check,
    icon: 'check',
  },
  {
    title: 'دفع الكمرك',
    id: OperationType.Manager,
    icon: 'dollar',
  },
  {
    title: 'احتساب الضريبة',
    id: OperationType.TaxWriter,
    icon: 'calculator',
  },
  {
    title: 'التحقق من الضريبة',
    id: OperationType.TaxChecker,
    icon: 'search',
  },
  {
    title: 'دفع الضريبة',
    id: OperationType.TaxComplete,
    icon: 'bars',
  },
  {
    title: 'فحص البضائع من المنافذ',
    id: OperationType.MerchantView,
    icon: 'ban',
  },
  {
    title: 'طلب تصريحة خروج',
    icon: 'briefcase',
    id: OperationType.MerchantComplete,
  },
  {
    title: 'فحص البضاعة من قبل النقاط الامنية',
    icon: 'shield',
    id: OperationType.Ports,
  },
  {
    icon: 'verified',
    title: 'تم تخليص البضاعة',
    id: OperationType.SecurityCheck,
  },

]
