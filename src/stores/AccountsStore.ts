export const useAccountsStore = defineStore('Accounts', () => {
  const showAccountsDialog = ref(false)
  const accountsData = ref({})
  const isEdit = ref<boolean>(false)
  const itemId = ref<string>('')

  const openEdit = (id: string) => {
    isEdit.value = true
    itemId.value = id
    showAccountsDialog.value = true
  }

  const closeEdit = () => {
    isEdit.value = false
    itemId.value = ''
  }

  const setAccountsDialog = (value: boolean) => {
    showAccountsDialog.value = value
  }

  const setAccounts = (value: any) => {
    accountsData.value = value
  }

  return {
    setAccountsDialog,
    showAccountsDialog,
    accountsData,
    setAccounts,
    openEdit,
    closeEdit,
    isEdit,
    itemId,

  }
})
