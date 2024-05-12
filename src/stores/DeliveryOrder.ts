import { Tabs } from '@/views/pages/delivery-order-item/types'

interface Status {
  name: string
  arName: string
  value: number
}

export const useDeliveryOrderStore = defineStore('deliveryOrder', () => {
  const deliveryOrder = ref()
  const addDialog = ref<boolean>(false)
  const isUpdateNoteDialogOpen = ref<boolean>(false)
  const openContainerDialog = ref<boolean>(false)
  const payDeliveryDialog = ref<boolean>(false)
  const tab = ref<Tabs>(Tabs.Containers)
  const container = ref({})
  const payData = ref({})
  const invoiceDialog = ref<boolean>(false)
  const cancelDialog = ref<boolean>(false)
  const cancelId = ref(null)
  const dropDialog = ref<boolean>(false)
  const dropId = ref(null)
  const isAdditionalInvoice = ref<boolean>(false)
  const isDialogDelete = ref<boolean>(false)
  const dataGoods = ref<any>({})
  const goodId = ref<string>('')
  const delId = ref<string>('')
  const isUploadAttachmentDialogOpen = ref<boolean>(false)
  const isPreviewInvoiceDialogOpen = ref<boolean>(false)
  const isOperationTaxesDialogOpen = ref<boolean>(false)
  const operationTaxes = ref<any[]>()

  const setOperationTaxes = (operationTaxesValue: any[], dialog: boolean) => {
    isOperationTaxesDialogOpen.value = dialog
    operationTaxes.value = operationTaxesValue
  }

  const setIsUpdateNoteDialogOpen = (value: boolean) => {
    isUpdateNoteDialogOpen.value = value
  }

  const setInvoiceDialog = (value: boolean, isAdditionalInvoiceVal = false) => {
    invoiceDialog.value = value
    isAdditionalInvoice.value = isAdditionalInvoiceVal
  }

  const setDeliveryOrder = (value: any) => {
    deliveryOrder.value = value
  }

  const setAddDialog = (value: boolean) => {
    addDialog.value = value
  }

  const setOpenContainerDialog = (value: boolean) => {
    openContainerDialog.value = value
  }

  const setContainer = (value: any) => {
    container.value = value
  }

  const setPayDeliveryDialog = (value: boolean) => {
    payDeliveryDialog.value = value
  }

  const setPayData = (value: any) => {
    payData.value = value
  }

  const setCancelDialog = (value: boolean) => {
    cancelDialog.value = value
  }

  const setCancelId = (value: any) => {
    cancelId.value = value
  }

  const setDropDialog = (value: boolean) => {
    dropDialog.value = value
  }

  const setDropId = (value: any) => {
    dropId.value = value
  }

  const setDeletDialog = (value: boolean, data: any) => {
    isDialogDelete.value = value
    dataGoods.value = data
  }

  const setIDGoods = (idDel: string, idGoods: string) => {
    goodId.value = idGoods
    delId.value = idDel
  }

  const setIsUploadAttachmentDialogOpen = (value: boolean) => {
    isUploadAttachmentDialogOpen.value = value
  }

  const setPreivewInvoice = (value: boolean) => {
    isPreviewInvoiceDialogOpen.value = value
  }

  return {
    deliveryOrder,
    addDialog,
    tab,
    setDeliveryOrder,
    setAddDialog,
    setOpenContainerDialog,
    openContainerDialog,
    setContainer,
    container,
    invoiceDialog,
    setInvoiceDialog,
    payData,
    payDeliveryDialog,
    setPayDeliveryDialog,
    setPayData,
    cancelDialog,
    setCancelDialog,
    cancelId,
    setCancelId,
    isAdditionalInvoice,
    isDialogDelete,
    setDeletDialog,
    dataGoods,
    goodId,
    setIDGoods,
    delId,
    setIsUploadAttachmentDialogOpen,
    isUploadAttachmentDialogOpen,
    isUpdateNoteDialogOpen,
    setIsUpdateNoteDialogOpen,
    setPreivewInvoice,
    isPreviewInvoiceDialogOpen,
    dropDialog,
    setDropDialog,
    dropId,
    setDropId,
    isOperationTaxesDialogOpen,
    setOperationTaxes,
    operationTaxes,
  }
})
