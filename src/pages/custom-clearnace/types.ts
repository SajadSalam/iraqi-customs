export enum CustomClearanceStatus {
  Pending = 0,
  Check = 1,
  Checker = 2,
  Auditor = 3,
  Manager = 4,
  TaxWriter = 5,
  TaxChecker = 6,
  TaxComplete = 7,
  MerchantComplete = 8,
  Ports = 9,
  SecurityCheck = 10,
}
export interface ClearanceDetails {
  certificate?: Certificate
  deliveryOrder?: string
  number?: string
  employeeName?: string
  accountantName?: string
  checkReason?: null
  checkType?: number
  products?: Product[]
  totalIqdAmount?: number
  totalUsdAmount?: number
  customeAmount?: number
  status?: number
  id?: string
  deleted?: boolean
  creationDate?: Date
}

export interface Certificate {
  customer?: Customer
  number?: string
  quantity?: number
  usedQuantity?: number
  iqdPrice?: number
  usdPrice?: number
  address?: string
  description?: string
  corNumber?: string
  deliveryOrders?: null
  itemName?: string
  status?: number
  coordinatorCode?: CoordinatorCode
  id?: string
  deleted?: boolean
  creationDate?: Date
}

export interface CoordinatorCode {
  code?: string
  deatials?: string
  unit?: string
  percent?: number
  usd?: number
  notes?: string
  related?: null
  id?: number
  deleted?: boolean
  creationDate?: null
}

export interface Customer {
  relatedId?: string
  ceo?: Ceo
  company?: Company
  status?: number
  id?: string
  deleted?: boolean
  creationDate?: Date
}

export interface Ceo {
  id?: string
  isApplicationNew?: boolean
  isCeoForeigner?: boolean
  fullName?: string
  fullNameEn?: string
  motherName?: string
  country?: string
  phoneNumber?: string
  image?: string
  governorate?: string
  city?: string
  mahala?: number
  zqaq?: number
  dar?: number
  passportNumber?: string
  passportDate?: Date
  documents?: string[]
}

export interface Company {
  id?: string
  nameAr?: string
  nameEn?: string
  url?: string
  taxNumber?: string
  issuer?: string
  chamberNumber?: string
  chamberDate?: Date
  branch?: string
  governorate?: string
  city?: string
  mahala?: number
  zqaq?: number
  dar?: number
  agentName?: string
  activityType?: string
  documents?: string[]
}

export interface Product {
  number?: string
  description?: string
  country?: null
  totalWeight?: string
  quantity?: number
  checkImages?: null
  identical?: null
  coordinatorCode?: null
  checkReason?: null
  checkType?: null
  notIdenticalReason?: null
  grossweight?: null
  netweight?: null
  id?: string
  deleted?: boolean
  creationDate?: Date
}

// Converts JSON strings to/from your types
export class Convert {
  public static toFlight(json: string): Flight {
    return JSON.parse(json)
  }

  public static flightToJson(value: Flight): string {
    return JSON.stringify(value)
  }
}
