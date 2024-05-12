export const useRolePermissionsStore = defineStore('rolePermissions', () => {
    const data = ref<any[]>([])
    const PermissionsDialog = ref<boolean>(false)
    const isEdit = ref<boolean>(false)
    const itemId = ref<string>('')
    const openEdit = (id: string) => {
        isEdit.value = true
        itemId.value = id
        PermissionsDialog.value = true
    }
    const closeEdit = () => {
        isEdit.value = false
        itemId.value = ''
    }
    const setPermissionsDialog = (value: boolean) => {
        PermissionsDialog.value = value
    }

    const setDataProductManifest = (newData: any[]) => {
        data.value = newData
    }

    return { PermissionsDialog, setPermissionsDialog, data, setDataProductManifest, openEdit, isEdit, itemId, closeEdit }
})
