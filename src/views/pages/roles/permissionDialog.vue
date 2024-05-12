<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import type { Permission, Role } from './types'
import { useRoleStore } from '@/stores/RoleStore'
import axios from '@axios'

const roleStore = useRoleStore()
const permissionDialog = computed(() => roleStore.permissionDialog)
const role = computed(() => roleStore.role)
const isLoading = ref(false)
const permissions = ref<Permission[]>([])
const selectedPermissions = ref<number[]>([])

const fetchData = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/role/${role.value?.id}`) as { data: { result: Role } }

    roleStore.setRole(data.result)
    selectedPermissions.value = data.result.permission!.map(v => v.id)

    const permissionRes = await axios.get('/permission') as { data: { result: { data: Permission[] } } }

    permissions.value = permissionRes.data.result.data
  }
  catch (error) {

  }
  finally {
    isLoading.value = false
  }
}

watch(() => role.value.id, newValue => {
  if (newValue)
    fetchData()
})

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group])
      previous[group] = []
    previous[group].push(currentItem)

    return previous
  }, {} as Record<K, T[]>)

const permissionsGrouped = computed(() => {
  if (!permissions.value)
    return []

  return groupBy(permissions.value, (v: Permission) => v.controller as string)
})

const returnShortPermissionName = (permission: Permission) => {
  const controller = String(permission.controller)
  const name = String(permission.name).replace(`${controller}-`, '')

  const regex = new RegExp(`^${controller}s?-?`, 'i')

  return name.replace(regex, '')
}

const addedPermissions = ref<number[]>([])
const deletedPermissions = ref<number[]>([])

const handleAddOrDelete = (id, e) => {
  const checked = e.target.checked

  if (!checked) {
    const isPermissionAdded = addedPermissions.value.includes(id)
    const isPermissionDeleted = deletedPermissions.value.includes(id)
    const isPermissionInRole = role.value.permission!.some(v => v.id === id)

    if (isPermissionAdded) {
      addedPermissions.value = addedPermissions.value.filter(v => v !== id)
    }
    else if (!isPermissionDeleted && isPermissionInRole) {
      deletedPermissions.value.push(id)
      addedPermissions.value = addedPermissions.value.filter(v => v !== id)
    }
  }
  else {
    const isPermissionDeleted = deletedPermissions.value.includes(id)
    const isPermissionInRole = role.value.permission!.some(v => v.id === id)

    if (isPermissionDeleted && isPermissionInRole) {
      deletedPermissions.value = deletedPermissions.value.filter(v => v !== id)
    }
    else if (!isPermissionInRole) {
      addedPermissions.value = addedPermissions.value.includes(id)
        ? addedPermissions.value.filter(v => v !== id)
        : [...addedPermissions.value, id]
    }
  }
}

const submit = async () => {
  try {
    isLoading.value = true
    if (addedPermissions.value.length > 0) {
      await axios.post(`/role/${role.value.id}/permissions`, {
        permissions: addedPermissions.value,
      })
    }
    if (deletedPermissions.value.length > 0) {
      await axios.delete(`/role/${role.value.id}/permissions`, {
        data: {
          permissions: deletedPermissions.value,
        },
      })
    }
    addedPermissions.value = []
    deletedPermissions.value = []
    fetchData()
    toast.success('تم تعديل الصلاحيات بنجاح')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="permissionDialog"
    persistent
    max-width="1500"
  >
    <VCard :loading="isLoading">
      <!--
        <h6>
        Added :
        {{ addedPermissions }}
        </h6>
        <h6>
        Deleted :
        {{ deletedPermissions }}
        </h6>
      -->
      <VCardTitle class="d-flex align-center pa-3">
        <span class="text-h4">
          الصلاحيات الخاصة بـ {{ role?.name }}
        </span>
        <VSpacer />
        <VBtn
          :loading="isLoading"
          color="primary"
          @click="submit"
        >
          <VIcon>mdi-check</VIcon>
          حفظ
        </VBtn>
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="roleStore.setPermissionDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol
            v-for="controller in Object.keys(permissionsGrouped)"
            :key="controller"
            cols="12"
            md="4"
          >
            <VExpansionPanels>
              <VExpansionPanel :title="controller">
                <VExpansionPanelText>
                  <VRow>
                    <VCol
                      v-for="permission in permissionsGrouped[controller]"
                      :key="permission.id"
                      cols="12"
                      md="6"
                    >
                      <VCheckbox
                        v-model="selectedPermissions"
                        :label="returnShortPermissionName(permission)"
                        :value="permission.id"
                        @click="handleAddOrDelete(permission.id, $event)"
                      />
                    </VCol>
                  </VRow>
                </vexpansionpaneltext>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
        <!-- {{ groupBy(role?.permission, v => v.controller) }} -->
      </VCardText>
    </VCard>
  </VDialog>
</template>
