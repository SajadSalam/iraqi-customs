export const useEManifestStore = defineStore('Emanifest', () => {
  const addDialog = ref(false)
  const itemsDialog = ref(false)
  const RecpictDialog = ref(false)
  const manifest = ref({})
  const isAddItemDialogOpen = ref(false)
  const isXML = ref(false)

  const setAddDialog = (value: boolean, isXMLDialog = false) => {
    addDialog.value = value
    isXML.value = isXMLDialog
  }

  const setItemsDialog = (value: boolean) => {
    itemsDialog.value = value
  }

  const setRecpictDialog = (value: boolean) => {
    RecpictDialog.value = value
  }

  const setManifest = (value: any) => {
    manifest.value = value
  }

  const setAddItemDialog = (value: boolean) => {
    isAddItemDialogOpen.value = value
  }

  return {
    addDialog,
    setAddDialog,
    itemsDialog,
    setItemsDialog,
    manifest,
    setManifest,
    RecpictDialog,
    setRecpictDialog,
    isAddItemDialogOpen,
    setAddItemDialog,
    isXML,
  }
})
