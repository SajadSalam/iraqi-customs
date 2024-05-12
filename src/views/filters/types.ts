export interface ContainerFiltersType {
  policaNumber?: string | null
  containerNumber?: string | null
  customerId?: string | null
  containerSize?: string | null
  containerWeightFrom?: string | null
  containerWeightTo?: string | null
  containerType?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null
  containerState?: 1 | 2 | 3 | null
  fillStatus?: 1 | 2 | 3 | null
  hasDeliveryOrder?: boolean
  containerLine?: string | null
  carWeightFrom?: string | null
  customerName?: string | null
}
export interface CarFiltersType {
  policaNumber?: string | null
  carWeightFrom?: string | null
  carWeightTo?: string | null
  carBillLading?: string | null
  carType?: string | null
  carBrand?: string | null
  carModel?: string | null
  carColor?: string | null
  carYear?: string | null
}

export interface GoodTypeFiltersType {
  policaNumber?: string | null
  goodsTypeId?: string | null
}

