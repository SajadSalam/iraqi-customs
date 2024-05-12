export enum FieldType {
  Text,
  Number,
  Select,
  Checkbox,
  Radio,
  Textarea,
  Date,
  DateTime,
  File,
  Password,
}
export interface FieldTypes {
  label?: string
  type?: FieldType
  modelValueKey?: string
  placeholder?: string
  disabled?: boolean
  getURL?: string
  options?: SelectableField
  cols?: number
  icon?: string
  dependsOn?: string
  validations?: any[]
  multiple?: boolean
  isHidden?: boolean
  defualtValue?: any
}
export interface SelectableField {
  getURL?: string
  items?: SelectableFieldType[] | any[]
  itemValue?: string
  itemLabel?: string
  placeholder?: string
  haveDependOn?: boolean
  searchKey?: string
  disabled?: boolean
  valueFrom?: string
  takeFrom?: string
  dependOn?: string
  dependValue?: string
}

export interface SelectableFieldType {
  id: string | number
  name: string
}
