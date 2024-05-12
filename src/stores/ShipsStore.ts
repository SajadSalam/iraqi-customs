export const useShipStore = defineStore('Ships', () => {
  const isAddUserShipOpen = ref<boolean>(false)
  const ship = ref({ id: null })

  const setUserShipDialog = (value: boolean) => {
    isAddUserShipOpen.value = value
  }

  const setData = (value: any) => {
    ship.value = value
  }

  return {
    ship,
    setUserShipDialog,
    isAddUserShipOpen,
    setData,
  }
})
