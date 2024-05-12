export interface Office {
  name?: string
  nameAr?: string
  nameEn?: string
  nameKr?: string
  long?: number
  id?: string
  lat?: number
  isActive: boolean
  openTime: string | null
  closeTime: string | null
  applicantsWithinHalfHour: number
  reservationsEndDate: string | null
  addressId: string | null
  governorateId: string | null
}
