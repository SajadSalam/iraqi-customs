export interface Customer {
  appUserId?: string
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
