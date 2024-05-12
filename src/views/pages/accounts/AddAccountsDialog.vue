<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { Body } from './types'
import { requiredValidator } from '@/@core/utils/validators'
import { AccountUserTypeEnum } from '@/constants/enums'
import { useAccountsStore } from '@/stores/AccountsStore'
import axios from '@axios'

const emits = defineEmits(['refresh'])
const AccountsStore = useAccountsStore()
const isLoading = ref(false)
const activeCredit = ref(false)
const activeDebit = ref(false)

const body = ref<Body>({
  tripId: null,
  tripPortId: null,
  parentId: null,
  number: '',
  orderType: null,
  isImport: true,
  name: null,
  credit: 0,
  debit: 0,
  userType: null,
  accountingType: null,
  isPayment: false,
  showInTree: false,
})

const isEdit = computed(() => {
  return AccountsStore.isEdit
})

const itemId = computed(() => {
  return AccountsStore.itemId
})

const form = ref<VForm>(null)

const postData = async () => {
  try {
    isLoading.value = true

    const isValid = await form.value.validate()
    if (!isValid.valid)
      return
    if (isEdit.value)
      await axios.put(`/Accounts/${itemId.value.id}`, body.value)
    else
      await axios.post('/Accounts', body.value)
    AccountsStore.setAccountsDialog(false)
    toast.success('تمت العملية بنجاح')
    emits('refresh')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(
  () => body.value.parentId,
  value => {
    axios
      .get(`/Accounts/maxnumber?parentId=${body.value.parentId}`)
      .then(res => {
        body.value.number = res.data.result
      })
  },
)
watch(() => isEdit.value, async val => {
  if (val) {
    isLoading.value = true

    const { data } = await axios.get(`/Accounts/${itemId.value.id}`)

    body.value.tripId = data.result.tripId
    body.value.tripPortId = data.result.tripPortId
    body.value.number = data.result.number
    body.value.name = data.result.name
    body.value.orderType = data.result.orderType
    body.value.isImport = data.result.isImport
    body.value.userType = data.result.userType
    body.value.accountingType = data.result.accountingType
    body.value.isPayment = data.result.isPayment
    body.value.showInTree = data.result.showInTree
    body.value.credit = data.result.credit
    body.value.debit = data.result.debit
    body.value.parentId = data.result.id

    isLoading.value = false
  }
})
watch(
  () => AccountsStore.showAccountsDialog,
  value => {
    if (!value)
      AccountsStore.closeEdit()
  },
)
</script>

<template>
  <VDialog
    v-model="AccountsStore.showAccountsDialog"
    max-width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span
          v-if="!isEdit"
          class="headline"
        > إضافة حساب </span>
        <span
          v-if="isEdit"
          class="headline"
        > تعديل حساب </span>
        <VSpacer />

        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="AccountsStore.setAccountsDialog(false)"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelectField
                v-model="body.parentId"
                :rules="[requiredValidator]"
                get-url="/Accounts"
                item-label="name"
                item-value="id"
                label="الحساب"
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="body.number"
                class="mt-2"
                label="رقم الحساب"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="body.name"
                class="mt-2"
                :rules="[requiredValidator]"
                label=" اسم الحساب"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.orderType"
                label="نوع العملية"
                :items="[
                  { title: 'None', value: 0 },
                  { title: 'DeliveryOrder', value: 1 },
                  { title: 'BillFreely', value: 2 },
                  { title: 'AccountVoucher', value: 3 },
                ]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.accountingType"
                :rules="[requiredValidator]"
                label="نوع الحساب"
                :items="[
                  { title: 'عام', value: 0 },
                  { title: 'تفصيل', value: 1 },
                ]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.userType"
                :rules="[requiredValidator]"
                label="نوع المستخدم"
                :items="AccountUserTypeEnum"
                item-title="arName"
                item-value="value"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="body.description"
                class="mt-2"
                label="الوصف"
              />
            </VCol>
            <VCol
              cols="12"
              md="12"
            >
              <VSwitch
                v-model="body.showInTree"
                color="primary"
                label="اظهار في الشجرة"
              />
              <VSwitch
                v-model="body.isPayment"
                color="primary"
                label="مدفوع"
              />
              <VSwitch
                v-if="!activeDebit"
                v-model="activeCredit"
                color="primary"
                label="الدائن"
              />
              <VSwitch
                v-if="!activeCredit"
                v-model="activeDebit"
                color="primary"
                label="المدين"
              />
            </VCol>
            <VCol
              v-if="activeCredit"
              cols="12"
              md="6"
            >
              <AppTextField
                v-model.number="body.credit"
                class="mt-2"
                label="الدائن"
                type="number"
              />
            </VCol>
            <VCol
              v-if="activeDebit"
              cols="12"
              md="6"
            >
              <AppTextField
                v-model.number="body.debit"
                class="mt-2"
                label="المدين"
                type="number"
              />
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-4 gap-3">
            <VBtn
              color="error"
              @click="AccountsStore.setAccountsDialog(false)"
            >
              إلغاء
            </VBtn>
            <VBtn
              color="primary"
              @click="postData"
            >
              حفظ
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
