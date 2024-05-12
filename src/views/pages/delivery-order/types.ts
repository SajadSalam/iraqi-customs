export interface Body {
  tripId?: string | null
  tripPortId?: string | null
  number?: number | null
  customerId: string | null
  customerAssigneeId: string | null
  agentId: string | null
  tripPortTerminalId?: string | null
  isExport?: boolean | null
  deliveryDate: string | null
  isCorrectName: boolean | null
  commissionerDirector: string
  [key: string]: any
}
export interface OpenContainerBody {
  fillStatus: number
  details: Detail[]
  deliveryOrderId: string
  containerId: string
}

export interface Detail {
  customer?: Customer | null
  customerId?: string | null
  goods?: Goods | null
  car?: Car | null
  isWaiver: boolean
}

export interface Car {
  number?: string
  size?: number
  weight?: number
  carType?: string
  carBrand?: string
  carModel?: string
  carColor?: string
  vinNo?: string
  carDetails?: string
  isDamage?: boolean
}

export interface Customer {
  phoneNumber: string
  fullname: string
}

export interface Goods {
  goodTypeId: number | null
  number?: string | null
  size?: number | null
  weight?: number | null
  quantity?: number | null
  goodsDetails?: string | null
}
