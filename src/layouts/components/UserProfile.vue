<script setup lang="ts">
import { isEmpty } from '@/@core/utils'
import { useUserStore } from '@/stores/UserStore'
import axios from '@axios'
import avatar1 from '@images/avatars/avatar-1.png'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  location.href = '/login'
}

const body = ref({
  phoneNumber: null,
  fullName: '',
  password: null,
  active: null,
  roleId: null,
  officeId: null,
})

const isEditProfileOpen = ref(false)
const isLoading = ref(false)

const editProfile = async () => {
  try {
    isLoading.value = true

    // set all empty to null
    for (const key in body.value) {
      if (isEmpty(body.value[key]))
        body.value[key] = null
    }
    await axios.put(`/user/${userStore.user.id}`, body.value)
    isEditProfileOpen.value = false
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userStore.user.fullname }}
            </VListItemTitle>
            <VListItemSubtitle>
              {{ userStore.user.phoneNumber }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />
          <VListItem @click="isEditProfileOpen = true">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-edit"
                size="22"
              />
            </template>

            <VListItemTitle>تعديل الحساب</VListItemTitle>
          </VListItem>
          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>تسجيل خروج</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
  <VDialog
    v-model="isEditProfileOpen"
    width="500"
    persistent
  >
    <VCard>
      <VCardTitle class="text-center">
        تعديل الحساب
      </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="editProfile">
          <AppTextField
            v-model="body.fullName"
            label="الاسم الكامل"
            autocomplete="off"
            name="editedFullName"
          />
          <AppTextField
            v-model="body.password"
            label="كلمة المرور"
            type="password"
            autocomplete="off"
            name="editedPassword"
          />
          <VBtn
            block
            color="primary"
            class="mt-4"
            :disabled="isLoading"
            :loading="isLoading"
            type="submit"
          >
            حفظ
          </VBtn>
          <!-- close -->
          <VBtn
            block
            color="error"
            class="mt-2"
            @click="isEditProfileOpen = false"
          >
            إلغاء
          </VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
