export const useOfficeStore = defineStore('office', () => {
  const isOfficeOpen = ref<boolean>(false)
  const dataDialog = ref({})
  const isAddManeger = ref<boolean>(false)
  const dataManeger = ref({})
  const isAddEmployee = ref<boolean>(false)
  const dataEmployee = ref({})

  const setDataDialog = (value: boolean) => {
    isOfficeOpen.value = value
  }

  const setOffice = (item: any) => {
    dataDialog.value = item
  }

  const setAddManeger = (value: boolean, data: any) => {
    isAddManeger.value = value
    dataManeger.value = data
  }

  const setAddEmployee = (value: boolean, data: any) => {
    isAddEmployee.value = value
    dataEmployee.value = data
  }

  return {
    setOffice,
    isOfficeOpen,
    setDataDialog,
    dataDialog,
    setAddManeger,
    isAddManeger,
    dataManeger,
    setAddEmployee,
    isAddEmployee,
    dataEmployee,

  }
})
