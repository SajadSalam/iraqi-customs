export const useBillFreelyStore = defineStore('BillFreely', () => {
  const showBillDetialsDialog = ref(false)

  const billData = ref({})

  const setBillDetailsDialog = (value: boolean) => {
    showBillDetialsDialog.value = value
  }

  const setBillFreey = (value: any) => {
    billData.value = value
  }

  return {
    showBillDetialsDialog,
    setBillDetailsDialog,
    billData,
    setBillFreey,
  }
})
