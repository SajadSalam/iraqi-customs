export interface Body {
  tripId?: string | null
  tripPortId?: string | null
  parentId: string | null
  number: string
  orderType: string | null
  isImport: boolean
  name: string | null
  credit: number | null
  debit: number | null
  userType: number | null
  accountingType: number | null
  isPayment: boolean
  showInTree: boolean
}
