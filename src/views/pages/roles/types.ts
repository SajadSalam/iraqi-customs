export interface Role {
  id: number
  name: string
  number: number
  permission?: Permission[]
}

export interface Permission {
  name: string | null
  description: string | null
  controller: string | null
  action: null | string
  crud: string | null
  actionName: null | string
  id: number
  isDeleted: boolean
}
