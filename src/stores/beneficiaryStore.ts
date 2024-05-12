export const useBeneficiaryStore = defineStore('beneficiary', () => {
  const trip = ref(
    {
      id: null,
    },
  )

  const leaveDialog = ref<boolean>(false)
  const receiptDialog = ref<boolean>(false)
  const beneficiaryDialog = ref<boolean>(false)

  const beneficiary = ref({
    fullname: null,
    phoneNumber: null,
    customerType: {
      id: null,
      name: null,
    },
    isGovernorate: {
      id: null,
      name: null,
    },
    address: null,
  })

  //   const tripPortTerminalDialog = ref<boolean>(false)

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
    beneficiaryDialog.value = value
  }

  const setBeneficiary = (value: any) => {
    beneficiary.value = value
  }

  //   const setTripPortTerminalDialog = (value: boolean) => {
  //     tripPortTerminalDialog.value = value
  //   }

  return { trip, leaveDialog, setLeaveDialog, setTrip, receiptDialog, setReceiptDialog, beneficiaryDialog, setTripPortDialog, beneficiary, setBeneficiary }
})
