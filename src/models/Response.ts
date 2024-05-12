export interface Response<T> {
  result : {
    data: T[]
    count: number
  }
}
