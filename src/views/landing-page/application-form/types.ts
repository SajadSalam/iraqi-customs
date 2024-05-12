export interface Body {
  user?: User
  ceo?: Ceo
  company?: Company
  relatedId?: string
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
  passportDate?: string
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
  chamberDate?: string
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

export interface User {
  email?: string
  password?: string
}
