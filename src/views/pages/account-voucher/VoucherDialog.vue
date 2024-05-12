<script setup lang="ts">
import type { VoucherType } from './types'
import { requiredValidator } from '@/@core/utils/validators'
import { useVoucherStore } from '@/stores/VoucherStore'
import axios from '@axios'

interface Props {
  title: string
  type: VoucherType
}
const props = defineProps<Props>()
const emits = defineEmits(['refresh'])
const VoucherStore = useVoucherStore()
const title = toRef(props, 'title')
const type = toRef(props, 'type')
const accounts = ref([])
const isLoading = ref(false)

// make interface for body
interface Body {
  number?: string | null
  type?: number | null
  date: string | null
  description: string
  fromAccountId: string | null
  toAccountId: string | null
  amount: number | null
}

const body = ref<Body>({
  number: null,
  type: type.value,
  date: null,
  description: '',
  fromAccountId: null,
  toAccountId: null,
  amount: null,
})

const getAccounts = async () => {
  isLoading.value = true

  const { data } = await axios.get('/Accounts')

  accounts.value = data.result.data
  isLoading.value = false
}

const isEdit = computed(() => {
  return VoucherStore.isEdit
})

const itemId = computed(() => {
  return VoucherStore.itemId
})

const form = ref<VForm>(null)

const postData = async () => {
  try {
    const isValid = await form.value.validate()
    if (!isValid.valid)
      return
    isLoading.value = true
    if (isEdit.value)
      await axios.put(`/AccountVoucher/${itemId.value}`, body.value)

    else
      await axios.post('/AccountVoucher', body.value)

    VoucherStore.setVoucherOnlyDialog(false)
    emits('refresh')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getAccounts()
})

watch(() => isEdit.value, async val => {
  if (val) {
    isLoading.value = true

    const { data } = await axios.get(`/AccountVoucher/${itemId.value}`)

    body.value.amount = data.result.amount
    body.value.date = data.result.date
    body.value.description = data.result.description
    body.value.fromAccountId = data.result.fromAccount.id

    // if not exist in accounts list
    if (!accounts.value.find(item => item.id === data.result.fromAccount.id))
      accounts.value.push(data.result.fromAccount)

    body.value.toAccountId = data.result.toAccount.id

    // if not exist in accounts list
    if (!accounts.value.find(item => item.id === data.result.toAccount.id))
      accounts.value.push(data.result.toAccount)

    body.value.number = data.result.number
    isLoading.value = false
  }
})
watch(() => VoucherStore.voucherOnlyDialog, val => {
  if (!val)
    VoucherStore.closeEdit()
})
</script>

<template>
  <VDialog
    v-model="VoucherStore.voucherOnlyDialog"
    max-width="800"
    persistent
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          إضافة مستند صرف
        </span>
        <VSpacer />

        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="VoucherStore.setVoucherOnlyDialog(false)"
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
              <AppTextField
                v-model="body.number"
                class="mt-2"
                :rules="[requiredValidator]"
                label="رقم الصادر"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDatePicker
                v-model="body.date"
                class="mt-2"
                :rules="[requiredValidator]"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                :items="trips"
                label="التاريخ"
                item-title="tripNumber"
                item-value="id"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="body.amount"
                class="mt-2"
                :rules="[requiredValidator]"
                label="المبلغ"
                type="Number"
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="body.description"
                class="mt-2"
                :rules="[requiredValidator]"
                label="الوصف"
                type="Textarea"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.fromAccountId"
                label="من حساب"
                :items="accounts"
                item-title="number"
                item-value="id"
              >
                <template #item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="item?.raw?.number"
                    :subtitle="item?.raw?.name"
                  />
                </template>
              </AppAutocomplete>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="body.toAccountId"
                label="الى حساب"
                :items="accounts"
                item-title="number"
                item-value="id"
              >
                <template #item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="item?.raw?.number"
                    :subtitle="item?.raw?.name"
                  />
                </template>
              </AppAutocomplete>
            </VCol>
          </VRow>
          <div class="d-flex justify-end mt-4 gap-3">
            <VBtn
              color="error"
              @click="VoucherStore.setVoucherOnlyDialog(false)"
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
