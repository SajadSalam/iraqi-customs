export enum Tabs {
  Cars = 1,
  Containers = 2,
  Goods = 3,
}

export interface DeliveryOrderItemBody {
  deliveryOrderId: string
  carIds: string[] | null
  containerIds: string[] | null
  goodIds: string[] | null
}
