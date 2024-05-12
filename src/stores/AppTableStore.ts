import type { FieldTypes } from '@/components/app-form/types'
import type { ApiUrls } from '@/models/apiUrls'

export const useTableStore = defineStore('app-table', () => {
  const data = ref<any[]>([])
  const isDeleteDialogOpen = ref(false)
  const deletedItemId = ref<string | number>('')
  const isFormDialogOpen = ref(false)
  const createFields = ref<FieldTypes[]>([])
  const initalData = ref()
  const dialogTitle = ref('')
  const urls = ref<ApiUrls>()
  const isLoading = ref(false)
  const refresh = ref(false)
  const title = ref('')
  const editId = ref<string | number | undefined>()

  const setTitle = (value: string) => {
    title.value = value
  }

  const setRefresh = (value: boolean) => {
    refresh.value = value
  }

  const setEdit = (value: string | number | undefined) => {
    editId.value = value
  }

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setUrls = (value: ApiUrls) => {
    urls.value = value
  }

  const setDialogTitle = (title: string) => {
    dialogTitle.value = title
  }

  const setInitialData = (value: any) => {
    initalData.value = value
  }

  const setFields = (fields: FieldTypes[]) => {
    createFields.value = fields
  }

  const setFormDialog = (value: boolean) => {
    isFormDialogOpen.value = value
  }

  const setData = (newData: any[]) => {
    data.value = newData
  }

  const setDeleteDialog = (value: boolean) => {
    isDeleteDialogOpen.value = value
  }

  const setDeletedItemId = (value: string | number) => {
    deletedItemId.value = value
  }

  return {
    refresh,
    setRefresh,
    setEdit,
    editId,
    setLoading,
    isLoading,
    urls,
    setUrls,
    data,
    isDeleteDialogOpen,
    setData,
    setDeleteDialog,
    setDeletedItemId,
    deletedItemId,
    setFormDialog,
    isFormDialogOpen,
    createFields,
    setFields,
    setInitialData,
    initalData,
    setDialogTitle,
    dialogTitle,
    setTitle,
    title,
  }
})
