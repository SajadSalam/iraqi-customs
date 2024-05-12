export interface PostBody {
  containers?: Container[]
  goods?: Good[]
  cars?: Car[]
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
  entryDate?: Date
  customerInfo?: string
}

export interface Container {
  containerId?: string
  isEmpty?: boolean
  customerInfo?: string
  goodsDetails?: string
  insidePort?: boolean
  entryDate?: Date
  loadingDate?: Date
  number?: string
  containerState?: number
  cars?: Car[]
  goods?: Good[]
}

export interface Good {
  goodTypeId?: string
  number?: string
  size?: number
  weight?: number
  quantity?: number
  goodsDetails?: string
  isNational?: boolean
  customerInfo?: string
}
