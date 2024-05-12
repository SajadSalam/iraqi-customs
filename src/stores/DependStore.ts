import type { SelectableFieldType } from '@/components/app-form/types'

export const useDependStore = defineStore('depend', () => {
  const dependOn = ref('')
  const dependValue = ref<string | number | boolean | SelectableFieldType | string[] | number[]>('')

  const setDependOn = (value: string) => {
    dependOn.value = value
  }

  const setDependValue = (value: string | number | boolean | SelectableFieldType | string[] | number[]) => {
    dependValue.value = value
  }

  return { setDependValue, setDependOn, dependOn, dependValue }
})
