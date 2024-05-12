export const useTripStore = defineStore('trip', () => {
  const trip = ref(
    {
      id: null,
    },
  )

  const leaveDialog = ref<boolean>(false)
  const receiptDialog = ref<boolean>(false)
  const tripPortDialog = ref<boolean>(false)
  const payDialog = ref<boolean>(false)
  const addDialog = ref<boolean>(false)
  const bill = ref(null)
  const datesDialog = ref<boolean>(false)
  const acceptDialog = ref<boolean>(false)
  const acceptId = ref(null)
  const isEdit = ref<boolean>(false)
  const itemId = ref(null)

  const tripPort = ref({
    id: null,
    port: {
      id: null,
      name: null,
    },
    terminal: {
      id: null,
      name: null,
    },
    fromPort: {
      id: null,
      name: null,
    },
    arrivalDate: null,
    entryDate: null,
  })

  const tripPortTerminalDialog = ref<boolean>(false)
  const tripPortTerminal = ref({ id: null })
  const exitId = ref(null)

  const datesBody = ref({
    dischargeStartDate: new Date(),
    dischargeEndDate: new Date(),
    startExportingDate: new Date(),
    endExportingDate: new Date(),
    landingDate: new Date(),
    exitDate: new Date(),
  })

  const setAddDialog = (value: boolean) => {
    addDialog.value = value
  }

  const setEditTripPortDate = (value: any) => {
    isEdit.value = value
    tripPortDialog.value = true
  }

  const setItem = (value: any) => {
    itemId.value = value
  }

  const closeEdit = () => {
    isEdit.value = false
    itemId.value = ''
  }

  const setDateBody = (value: any) => {
    datesBody.value = value
  }

  const setTripPortTerminal = (value: any) => {
    tripPortTerminal.value = value
  }

  const setExitId = (value: any) => {
    exitId.value = value
  }

  const setDatesDialog = (value: boolean) => {
    datesDialog.value = value
  }

  const setLeaveDialog = (value: boolean) => {
    leaveDialog.value = value
  }

  const setTrip = (value: any) => {
    trip.value = value
  }

  const setReceiptDialog = (value: boolean) => {
    receiptDialog.value = value
  }

  const setTripPortDialog = (value: boolean) => {
    tripPortDialog.value = value
  }

  const setTripPort = (value: any) => {
    tripPort.value = value
  }

  const setPayDialog = (value: boolean) => {
    payDialog.value = value
  }

  const setTripPortTerminalDialog = (value: boolean) => {
    tripPortTerminalDialog.value = value
  }

  const setCancelDialog = (value: boolean) => {
    acceptDialog.value = value
  }

  const setCancelId = (value: any) => {
    acceptId.value = value
  }

  const setBill = (value: any) => {
    bill.value = value
  }

  return {
    trip,
    leaveDialog,
    setLeaveDialog,
    setTrip,
    receiptDialog,
    setReceiptDialog,
    tripPortDialog,
    setTripPortDialog,
    tripPort,
    setTripPort,
    tripPortTerminalDialog,
    setTripPortTerminalDialog,
    exitId,
    setExitId,
    payDialog,
    setPayDialog,
    bill,
    setBill,
    datesDialog,
    setDatesDialog,
    datesBody,
    setDateBody,
    tripPortTerminal,
    setTripPortTerminal,
    acceptDialog,
    setCancelDialog,
    setCancelId,
    acceptId,
    isEdit,
    setEditTripPortDate,
    itemId,
    setItem,
    closeEdit,
    addDialog,
    setAddDialog,
  }
})
