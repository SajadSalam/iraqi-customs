interface EnumValue {
  name: string
  value: number
  arName: string // Added Arabic name property
  color?: string // Added color property
}
export const getEnum = (enumValues: EnumValue[], value: number) => {
  return enumValues.find(item => item.value === value) ?? enumValues[0]
}

/*
Pending = 0,
        Check,
        Checker,
        Auditor,
        Manager, */

const customClearanceStatus = [
  {
    name: 'Pending',
    value: 0,
    arName: 'قيد الانتظار',
    color: 'warning',
  },
  {
    name: 'Check',
    value: 1,
    arName: 'فحص',
    color: 'error',
  },
  {
    name: 'Checker',
    value: 2,
    arName: 'فاحص',
    color: 'success',
  },
  {
    name: 'Auditor',
    value: 3,
    arName: 'مراجع',
    color: 'info',
  },
  {
    name: 'Manager',
    value: 4,
    arName: 'مدير',
    color: 'primary',
  },
  {
    name: 'TaxWriter',
    value: 5,
    arName: 'كاتب الضرائب',
    color: 'secondary',
  },
  {
    name: 'TaxChecker',
    value: 6,
    arName: 'فاحص الضرائب',
    color: 'info',
  },
  {
    name: 'TaxComplete',
    value: 7,
    arName: 'مكتمل الضرائب',
    color: 'secondary',
  },
  {
    name: 'MerchantView',
    value: 8,
    arName: 'عرض التاجر',
    color: 'info',
  },
  {
    name: 'MerchantComplete',
    value: 9,
    arName: 'مكتمل التاجر',
    color: 'success',
  },

]

const typeStatus: EnumValue[] = [
  {
    name: 'Download',
    value: 1,
    arName: 'تحميل', // Arabic name for 'Download'
    color: 'primary', // Color for 'Download'
  },
  {
    name: 'Evacuation',
    value: 2,
    arName: 'إخلاء', // Arabic name for 'Evacuation'
    color: 'error', // Color for 'Evacuation'
  },
  {
    name: 'BeneficiaryProperty',
    value: 3,
    arName: 'ممتلكات المستفيد', // Arabic name for 'BeneficiaryProperty'
    color: 'warning', // Color for 'BeneficiaryProperty'
  },
]

const orderTypes = [
  {
    name: 'None',
    value: 0,
    arName: 'لا شيء',
    color: 'blue',
  },
  {
    name: 'DeliveryOrder',
    value: 1,
    arName: 'طلب توصيل',
    color: 'green',
  },
  {
    name: 'BillFreely',
    value: 2,
    arName: 'فاتورة مجانية',
    color: 'yellow',
  },
  {
    name: 'AccountVoucher',
    value: 3,
    arName: 'قسيمة حساب',
    color: 'red',
  },
]

export const OperationTransaction = [
  {
    name: 'New',
    value: 1,
    arName: 'جديد',
  },
  {
    name: 'Update',
    value: 2,
    arName: 'تعديل',
  },
  {
    name: 'Delete',
    value: 3,
    arName: 'حذف',
  },
]

const DepartmentTypeEnum: EnumValue[] = [
  { name: 'Manage', value: 1, arName: 'الإدارة' },
  { name: 'Pier', value: 2, arName: 'الرصيف' },
  { name: 'Yard', value: 3, arName: 'الساحة' },
  { name: 'WaitingArea', value: 4, arName: 'منطقة الانتظار' },
]

const CarSpeedEnum: EnumValue[] = [
  { name: 'MoreThan60', value: 0, arName: 'أكثر من 60' },
  { name: 'LessThan60', value: 1, arName: 'أقل من 60' },
]

const DependOnEnum: EnumValue[] = [
  { name: 'Weight', value: 0, arName: 'الوزن' },
  { name: 'Size', value: 1, arName: 'الحجم' },
  { name: 'WeightAndSize', value: 2, arName: 'الوزن والحجم' },
  { name: 'Count', value: 3, arName: 'العدد' },
  { name: 'CountAndWeight', value: 4, arName: 'العدد والوزن' },
  { name: 'CountAndSize', value: 5, arName: 'العدد والحجم' },
]

const NotificationType: EnumValue[] = [
  { name: 'SMS', value: 1, arName: 'رسالة نصية' },
  { name: 'Firebase', value: 2, arName: 'Firebase' },
  { name: 'SignalRHub', value: 3, arName: 'SignalRHub' },
]

const payTypes: EnumValue[] = [
  {
    name: 'Cash',
    arName: 'نقداً',
    value: 1,
  },
  {
    name: 'Insurance',
    arName: 'تأمين',
    value: 2,
  },
  {
    name: 'Credit',

    arName: 'دفع الكتروني',
    value: 3,
  },
  {
    name: 'Deferred',
    arName: 'آجل',
    value: 4,
  },
]

const PayStatusEnum: EnumValue[] = [
  { name: 'Pending', value: 0, arName: 'قيد الانتظار', color: 'warning' },
  { name: 'Confirmed', value: 1, arName: 'تم التأكيد', color: 'success' },
  { name: 'Paid', value: 2, arName: 'تم الدفع', color: 'success' },
  { name: 'Cancelled', value: 3, arName: 'تم الإلغاء', color: 'error' },
  { name: 'Rejected', value: 4, arName: 'تم الرفض', color: 'error' },
  { name: 'Expired', value: 5, arName: 'منتهية الصلاحية', color: 'error' },
  { name: 'Deleted', value: 6, arName: 'تم الحذف', color: 'error' },
  { name: 'Reversed', value: 7, arName: 'تم التراجع', color: 'error' },
]

const PayStatusGroupEnum: EnumValue[] = [
  { name: 'Paid', value: 0, arName: 'تم الدفع' },
  { name: 'Unpaid', value: 1, arName: 'لم يتم الدفع' },
]

const StatusEnum: EnumValue[] = [
  { name: 'Pending ', value: 1, arName: 'قيد الانتظار', color: 'warning' },
  { name: 'Approved ', value: 2, arName: 'تم التأكيد', color: 'success' },
  { name: 'Rejected ', value: 3, arName: 'مرفوض', color: 'error' },
  { name: 'Canceled ', value: 4, arName: 'تم الالغاء', color: 'error' },
  { name: 'Completed ', value: 5, arName: 'مكتمل', color: 'primary' },
  { name: 'InProgress', value: 6, arName: 'يتم المراجعة', color: 'info' },
]

const statusEnumTrip: EnumValue[] = [
  {
    name: 'Pending',
    arName: 'قيد الانتظار',
    value: 1,
    color: 'warning',
  },
  {
    name: 'Approved',
    arName: 'تمت الموافقة',
    value: 2,
    color: 'success',
  },
  {
    name: 'Rejected',
    arName: 'مرفوض',
    value: 3,
    color: 'error',
  },
  {
    name: 'Canceled',
    arName: 'ملغى',
    value: 4,
    color: 'error',
  },
  {
    name: 'Completed',
    arName: 'مكتمل',
    value: 5,
    color: 'primary',
  },
  {
    name: 'InProgress',
    arName: 'قيد التنفيذ',
    value: 6,
    color: 'info',
  },
]

const GoodTypeEnum: EnumValue[] = [
  { name: 'Cars', value: 1, arName: 'سيارات' },
  { name: 'Container', value: 2, arName: 'حاوية' },
  { name: 'Goods', value: 3, arName: 'بضائع' },
]

const TripPortScheduleStatusEnum: EnumValue[] = [
  { name: 'Entry', value: 0, arName: 'الدخول' },
  { name: 'Arrived', value: 1, arName: 'وصل' },
  { name: 'Unloading', value: 2, arName: 'في عملية التفريغ' },
  { name: 'CargoLoaded', value: 3, arName: 'تم تحميل البضائع' },
  { name: 'Departed', value: 4, arName: 'رحيل' },
]

const TripPortTerminalScheduleStatusEnum: EnumValue[] = [
  { name: 'Loading', value: 0, arName: 'جاري التحميل' },
  { name: 'EndLoading', value: 1, arName: 'انتهاء التحميل' },
  { name: 'Discharging', value: 2, arName: 'جاري التفريغ' },
  { name: 'EndDischarging', value: 3, arName: 'انتهاء التفريغ' },
  { name: 'Landed', value: 4, arName: 'وصول' },
  { name: 'Exited', value: 5, arName: 'خروج' },
]

const TripScheduleStatusEnum: EnumValue[] = [
  { name: 'Scheduled', value: 0, arName: 'مجدول' },
  { name: 'EnRoute', value: 1, arName: 'في الطريق' },
  { name: 'Delayed', value: 2, arName: 'متأخر' },
  { name: 'Anchored', value: 3, arName: 'مرسى' },
  { name: 'Berthed', value: 4, arName: 'مرسى' },
  { name: 'Unloading', value: 5, arName: 'جاري التفريغ' },
  { name: 'Loading', value: 6, arName: 'جاري التحميل' },
  { name: 'Exit', value: 7, arName: 'الخروج' },
  { name: 'Cancelled', value: 8, arName: 'ملغية' },
]

const ShipTypeShapeEnum: EnumValue[] = [
  { name: 'Normal', value: 0, arName: 'عادي' },
  { name: 'Locomotive', value: 1, arName: 'جار' },
  { name: 'Trailer', value: 2, arName: 'مقطورة' },
]

const AmountTypeEnum: EnumValue[] = [
  { name: 'Percent', value: 1, arName: 'نسبة مئوية' },
  { name: 'Fixed', value: 2, arName: 'ثابت' },
]

const OperationBillFreelyTypeEnum: EnumValue[] = [
  { name: 'Trip', value: 1, arName: 'رحلة' },
  { name: 'InternalTrip', value: 2, arName: 'رحلة داخلية' },
]

const OperationUseTypeEnum: EnumValue[] = [
  { name: 'Other', value: 1, arName: 'أخرى' },
  { name: 'FirstTime', value: 2, arName: 'لأول مرة' },
]

const RoleOperationTypeEnum: EnumValue[] = [
  { name: 'BillFreely', value: 1, arName: 'فاتورة حرة' },
  { name: 'DeliveryOrder', value: 2, arName: 'أمر تسليم' },
]

const DepartmentCategoryEnum: EnumValue[] = [
  { name: 'Specific', value: 1, arName: 'محدد' },
  { name: 'NoSpecific', value: 2, arName: 'غير محدد' },
]

const PayTypeEnum: EnumValue[] = [
  { name: 'None', value: 0, arName: 'بدون', color: 'error' },
  { name: 'Cash', value: 1, arName: 'نقدي', color: 'info' },
  { name: 'Insurance', value: 2, arName: 'تأمين', color: 'warning' },
  { name: 'Credit', value: 3, arName: 'ائتمان', color: 'success' },
  { name: 'Deferred', value: 4, arName: 'مؤجل', color: 'info' },
]

const DeliveryOrderStatusEnum: EnumValue[] = [
  { name: 'Created', value: 0, arName: 'تم الإنشاء', color: 'info' },
  { name: 'PrintInvoice', value: 1, arName: 'طباعة الفاتورة', color: 'warning' },
  { name: 'Paid', value: 2, arName: 'تم الدفع', color: 'success' },
  { name: 'Cancelled', value: 6, arName: 'تم الإلغاء', color: 'error' },
]

const ContainerStateEnum: EnumValue[] = [
  { name: 'Dangers', value: 1, arName: 'خطرة' },
  { name: 'UnDangers', value: 2, arName: 'غير خطرة' },
]

const ContainerStatusEnum: EnumValue[] = [
  { name: 'Empty', value: 1, arName: 'فارغ' },
  { name: 'Filled', value: 2, arName: 'ممتلئ' },
  { name: 'PartLoaded', value: 3, arName: 'تحميل جزئي' },
]

const ContainerTypeEnum: EnumValue[] = [
  { name: 'Normal', value: 1, arName: 'عادي' },
  { name: 'PlainStyle', value: 2, arName: 'نمط عادي' },
  { name: 'Refrigerated', value: 3, arName: 'مبرد' },
  { name: 'RefrigeratedPlainStyle', value: 4, arName: 'مبرد - نمط عادي' },
  { name: 'CeilingOpen', value: 5, arName: 'فتح السقف' },
  { name: 'OpenSides', value: 6, arName: 'جوانب مفتوحة' },
  { name: 'OpenCeilingStyle', value: 7, arName: 'نمط فتح السقف' },
  {
    name: 'OpenSidesPlainStyle',
    value: 8,
    arName: 'نمط الجوانب المفتوحة - نمط عادي',
  },
]

const AccountingTypeEnum: EnumValue[] = [
  { name: 'General', value: 0, arName: 'عام' },
  { name: 'Detail', value: 1, arName: 'تفصيلي' },
]

const AccountUserTypeEnum: EnumValue[] = [
  {
    name: 'أخرى',
    value: 1,
    arName: 'أخرى',
  },
  {
    name: 'وكيل السفينة',
    value: 2,
    arName: 'وكيل السفينة',
  },
  {
    name: 'الشركة المشتركة في العمل',
    value: 3,
    arName: 'الشركة المشتركة في العمل',
  },
  {
    name: 'شركة الشحن',
    value: 4,
    arName: 'شركة الشحن',
  },
  {
    name: 'المستفيد',
    value: 5,
    arName: 'المستفيد',
  },
  {
    name: 'شركة التأمين',
    value: 6,
    arName: 'شركة التأمين',
  },
  {
    name: 'مأذون',
    value: 7,
    arName: 'مأذون',
  },
  {
    name: 'مكتب بوابة التصدير والاستيراد الالكترونية',
    value: 8,
    arName: 'مكتب بوابة التصدير والاستيراد الالكترونية',
  },
]

export {
  AccountUserTypeEnum,
  AccountingTypeEnum,
  AmountTypeEnum,
  CarSpeedEnum,
  ContainerStateEnum,
  ContainerStatusEnum,
  ContainerTypeEnum,
  DeliveryOrderStatusEnum,
  DepartmentCategoryEnum,
  DepartmentTypeEnum,
  DependOnEnum,
  GoodTypeEnum,
  NotificationType,
  OperationBillFreelyTypeEnum,
  OperationUseTypeEnum,
  PayStatusEnum,
  PayStatusGroupEnum,
  PayTypeEnum,
  RoleOperationTypeEnum,
  ShipTypeShapeEnum,
  StatusEnum,
  TripPortScheduleStatusEnum,
  TripPortTerminalScheduleStatusEnum,
  TripScheduleStatusEnum, customClearanceStatus, orderTypes, payTypes,
  statusEnumTrip,
  typeStatus,
}
