export const useManifestStore = defineStore('manifest', () => {
  const data = ref<any[]>([])
  const shipActionDialog = ref<boolean>(false)
  const continerDialog = ref<boolean>(false)
  const summaryShipDialog = ref<boolean>(false)
  const invoiceShipDialog = ref<boolean>(false)
  const prductManifestDialog = ref<boolean>(false)
  const attachmentDialog = ref<boolean>(false)
  const editId = ref<any>()

  // manifestStore.setGoodTypeDialog(true)
  // manifestStore.setDataGoodType(item.id)
  const goodTypeDialog = ref<boolean>(false)
  const dataGoodType = ref<any>({})

  const setDataGoodType = (newData: any) => {
    dataGoodType.value = newData
  }

  const setGoodTypeDialog = (value: boolean) => {
    goodTypeDialog.value = value
  }

  const setShipActionDialog = (value: boolean) => {
    shipActionDialog.value = value
  }

  const setContinerDialog = (value: boolean) => {
    continerDialog.value = value
  }

  const setSummaryShipDialogDialog = (value: boolean) => {
    summaryShipDialog.value = value
  }

  const setInvoiceShipDialog = (value: boolean) => {
    summaryShipDialog.value = value
  }

  const setproductManifestDialog = (value: boolean) => {
    prductManifestDialog.value = value
  }

  const setDataProductManifest = (newData: any[]) => {
    data.value = newData
  }

  const setEditId = (data: any) => {
    editId.value = data
  }

  const setAttachmentDialog = (value: boolean) => {
    attachmentDialog.value = value
  }

  return {
    shipActionDialog,
    setShipActionDialog,
    continerDialog,
    setContinerDialog,
    summaryShipDialog,
    setSummaryShipDialogDialog,
    invoiceShipDialog,
    setInvoiceShipDialog,
    prductManifestDialog,
    setproductManifestDialog,
    data,
    setDataProductManifest,
    goodTypeDialog,
    setGoodTypeDialog,
    dataGoodType,
    setDataGoodType,
    editId,
    setEditId,
    attachmentDialog,
    setAttachmentDialog,
  }
})
