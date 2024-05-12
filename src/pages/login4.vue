<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm';

import type { LoginBody } from '@/models/login';
import { useUserStore } from '@/stores/UserStore';
import axios from '@axios';

const router = useRouter()
const isPasswordVisible = ref(false)
const userStore = useUserStore()

const refVForm = ref<VForm>()

const body = ref<LoginBody>({
  phoneNumber: '',
  password: '',
})

const isError = ref(false)
const isLoading = ref(false)

const submit = async () => {
  if ((await refVForm.value?.validate())?.valid) {
    try {
      isError.value = false
      isLoading.value = true

      const res = await axios.post('/Authentication/Login', {
        phoneNumber: body.value.phoneNumber,
        password: body.value.password,
      })
      userStore.setUser(res.data.result.userType)
      localStorage.setItem('accessToken', res.data.result.token)

      router.push("/")
    }
    catch (error) {
      isError.value = true
      console.log(error)
    }
    finally {
      isLoading.value = false
    }
  }
}
const pushTo = (role: string) => {
  if (role == 'CallCenter') {
    return '/qr'
  } else {
    return '/'
  }
}
onMounted(() => {
  if (localStorage.getItem('accessToken'))
    router.push(pushTo(userStore.user.role))
})
</script>

<template>
  <div>
    <VRow style=" width: 100%;height: 101vh;">
      <VCol cols="12" md="4" class="login">
        <VCard :loading="isLoading" class="mt-10 mx-md-10 v-theme--dark transparent text-white" variant="flat">
          <VCardTitle class="d-flex flex-column text-center text-white">
            <span class="my-5"> تسجيل الدخول </span>
          </VCardTitle>
          <VCardText>
            <VForm ref="refVForm" lazy-validation @submit.prevent="submit">
              <VTextField v-model="body.phoneNumber" :rules="[requiredValidator]" outlined
                label="البريد الالكتروني او اسم المستخدم" required prepend-inner-icon="tabler-mail" />
              <VTextField v-model="body.password" :rules="[requiredValidator]" label="كلمة المرور" class="my-5 text-white"
                :type="isPasswordVisible ? 'text' : 'password'" outlined required prepend-inner-icon="tabler-lock">
                <template #append-inner>
                  <VIcon :color="isPasswordVisible ? 'primary' : ''" @click="isPasswordVisible = !isPasswordVisible">
                    {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
                  </VIcon>
                </template>
              </VTextField>
              <h4 v-if="isError" class="text-error mx-2 ">
                غير مخول بالدخول للنظام
              </h4>
              <div class="d-flex justify-end align-end mt-8">
                <VBtn class="mt-5" block color="primary" type="submit">
                  تسجيل الدخول
                </VBtn>
              </div>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="8" class="info">
        <div class="d-flex justify-center mt-10">
          <img src="/logo.png" width="200" alt="" srcset="">
        </div>
      </VCol>
    </VRow>
    <!-- Content ends -->
  </div>
</template>

<style lang="scss">
@import "@/styles/styles";

body {
  padding: 0 !important;
  margin: 0 !important;
}

.login {
  height: 100%;
  border-left: 5px solid $primary;
  background: rgba($primary, 0.8);
}

.info {
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 250px;
    background-image: url("/ship.svg");
    background-size: contain;
    content: "";
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
