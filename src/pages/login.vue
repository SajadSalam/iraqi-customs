<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import Map1 from '@/assets/map1.png'

import { emailValidator, requiredValidator } from '@/@core/utils/validators'

import type { LoginBody } from '@/models/login'
import swAxios from '@/plugins/sw-axios'
import { useUserStore } from '@/stores/UserStore'

const isPasswordVisible = ref(false)
const userStore = useUserStore()

const refVForm = ref<VForm>()

const body = ref<LoginBody>({
  email: '',
  password: '',
})

const isError = ref(false)
const isLoading = ref(false)

const submit = async () => {
  if ((await refVForm.value?.validate())?.valid) {
    try {
      isError.value = false
      isLoading.value = true

      const res = await swAxios.post('/login', {
        email: body.value.email,
        password: body.value.password,
      })

      userStore.setUser(res.data)

      localStorage.setItem('accessToken', res.data.token)

      window.location.href = '/'
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
</script>

<template>
  <div>
    <div class="header">
      <div class="  py-5  px-10 overflow-y-hidden">
        <VRow
          class="mx-10 overflow-y-hidden"
          justify="center"
        >
          <VCol
            cols="12"
            md="5"
          >
            <VCard
              :loading="isLoading"
              class="mt-10 mx-md-10 overflow-y-hidden"
              height="90vh"
            >
              <VImg
                :src="Map1"
                height="200"
              />
              <VCardTitle class="d-flex flex-column text-ceer my-5">
                <p class="m-0 p-0 text-disabled text-h6 font-weight-bold">
                  الدخول للمنصة
                </p>
                <h1 class=" m-0 p-0  text-primary text-h1 font-weight-bold">
                  تسجيل الدخول
                </h1>
              </VCardTitle>
              <VCardText>
                <VForm
                  ref="refVForm"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <VTextField
                    v-model="body.email"
                    :rules="[emailValidator]"
                    outlined
                    label="رقم الهاتف"
                    required
                    prepend-inner-icon="tabler-mail"
                  />
                  <VTextField
                    v-model="body.password"
                    :rules="[requiredValidator]"
                    label="كلمة المرور"
                    class="my-5"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    outlined
                    required
                    prepend-inner-icon="tabler-lock"
                  >
                    <template #append-inner>
                      <VIcon
                        :color="isPasswordVisible ? 'primary' : ''"
                        @click="isPasswordVisible = !isPasswordVisible"
                      >
                        {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
                      </VIcon>
                    </template>
                  </VTextField>
                  <h4
                    v-if="isError"
                    class="text-error mx-2 "
                  >
                    غير مخول بالدخول للنظام
                  </h4>
                  <div class="d-flex justify-end align-end mt-8">
                    <VBtn
                      class=""
                      block
                      color="primary"
                      type="submit"
                    >
                      تسجيل الدخول
                    </VBtn>
                  </div>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <div class="d-md-flex align-start  flex-column d-none mt-10">
              <img
                width="200"
                src="/iraq.png"
              >
              <div class="d-flex align-start flex-column mx-2 ">
                <h1 class="mt-10 text-white">
                  البوابة الالكترونية الموحدة
                  للاستيراد والتصدير
                </h1>
                <h3 class="mt-5 text-white font-weight-medium">
                  البوابة الإلكترونية الموحدة للاستيراد والتصدير تسهل التجارة بين الدول بوساطة منصة رقمية، توفر بيئة مركزية لتبادل المعلومات وتيسير الإجراءات الجمركية، مما يقلل من التكاليف ويزيد من كفاءة العمليات التجارية والتصديرية.
                </h3>
              </div>
            </div>
          </VCol>
        </VRow>
      </div>
      <!-- Waves end -->
    </div>
    <div class="bg" />
  </div>
</template>

<style>
body {
  margin: 0;
}

.border {
  border-radius: 5px;
  background: #fff;
  block-size: 5px;
  inline-size: 75%;
}

h1 {
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 2px;
}

p {
  color: #333;
  font-family: Cairo, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
}

.header {
  position: relative;
  z-index: 2;
  color: white;
  overflow-y: hidden;
}

.bg {
  position: absolute;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  height: 100vh;
  background-image: url("/bg-login.png");
  color: white;
  overflow-y: hidden;
}

.bg::after {
  position: absolute;
  background: rgba(0, 0, 0, 50%);
  content: "";
  inset: 0;
  overflow-y: hidden;
}

.logo {
  display: inline-block;
  fill: white;
  inline-size: 50px;
  overflow-y: hidden;
  padding-inline-end: 15px;
  vertical-align: middle;
}

.inner-header {
  padding: 0;
  margin: 0;
  block-size: 65vh;
  inline-size: 100%;
  overflow-y: hidden;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;

  /* Flexbox for containers */
  overflow-y: hidden;
}

.content {
  position: relative;
  background-color: white;
  block-size: 20vh;
  overflow-y: hidden;
  text-align: center;
}

* {
  overflow-y: hidden !important;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
