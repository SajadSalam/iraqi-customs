import type { Permission } from '@/views/pages/roles/types'

export const useUserStore = defineStore('users', () => {
  const rolePermissions = computed<Permission[]>({
    get() {
      const rolePermissionsData = localStorage.getItem('rolePermissions')
      if (rolePermissionsData)
        return JSON.parse(rolePermissionsData)

      return [] as Permission[]
    },
    set(value) {
      localStorage.setItem('rolePermissions', JSON.stringify(value))
    },
  })

  const user = computed<User>({
    get() {
      const userData = localStorage.getItem('userData')
      if (userData)
        return JSON.parse(userData)

      return {} as User
    },
    set(value) {
      localStorage.setItem('userData', JSON.stringify(value))
    },
  })

  const accessToken = computed<string>({
    get() {
      return user.value.token
    },
    set(value) {
      user.value.token = value
    },
  })

  const setUser = (value: User) => {
    user.value = value
  }

  const setRolePermissions = (value: Permission[]) => {
    rolePermissions.value = value
  }

  const logout = () => {
    user.value = {} as User
    rolePermissions.value = [] as Permission[]
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
  }

  const isInRoles = (roles: string[]) => {
    const role = user.value.role || ''

    return roles.includes(role)
  }

  const havePermission = (permission: string) => {
    return true
    if (!permission)
      return true

    const have = rolePermissions.value.findIndex(p => p.name?.toLowerCase() === permission.toLowerCase())

    return have >= 0
  }

  const generalPermission = (controller: string, crud: string) => {
    return true
    const have = rolePermissions.value.findIndex(p => p.controller?.toLowerCase() === controller.toLowerCase() && p.crud?.toLowerCase() === crud.toLowerCase())

    return have >= 0
  }

  return { user, setUser, isInRoles, accessToken, logout, rolePermissions, setRolePermissions, havePermission, generalPermission }
})
interface User {
  id: string
  fullName: string
  email: string
  token: string
  role: string
  officeId?: string
}
