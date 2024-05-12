export const useCustomerStore = defineStore('Cusomers', () => {
  const customerDialog = ref(false)
  const editId = ref<string | number | undefined>(undefined)
  const attachmentDialog = ref(false)

  const setCusomerDialog = (value: boolean) => {
    customerDialog.value = value
  }

  const setEditId = (value: string | number | undefined) => {
    editId.value = value
    customerDialog.value = true
  }

  const setCloseDialog = () => {
    customerDialog.value = false
    editId.value = undefined
  }

  const setAttachmentDialog = (value: boolean) => {
    attachmentDialog.value = value
  }

  return {
    customerDialog,
    setCusomerDialog,
    editId,
    setEditId,
    attachmentDialog,
    setAttachmentDialog,
    setCloseDialog,
  }
})
