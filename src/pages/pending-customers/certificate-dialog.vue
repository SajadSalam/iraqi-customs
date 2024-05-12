<script lang="ts" setup>
import swAxios from '@/plugins/sw-axios'

interface Props {
  customerId: string
  isDialogOpen: boolean
}
const props = defineProps<Props>()

const emits = defineEmits([
  'update:isDialogOpen',
])

const body = ref({
  quantity: 0,
  iqdPrice: 0,
  usdPrice: 0,
  address: '',
  description: '',
  corNumber: '',
  itemName: '',
  coordinatorCodeId: null,
})

const isLoading = ref(false)

const isDialogOpen = computed({
  get: () => props.isDialogOpen,
  set: (value: boolean) => emits('update:isDialogOpen', value),
})

const router = useRouter()

const submit = async () => {
  try {
    isLoading.value = true
    await swAxios.post(`/certificats/${props.customerId}`, body.value)
    isDialogOpen.value = false
    router.push('/delivery-order')
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
  <VDialog
    v-model="isDialogOpen"
    width="800"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center font-weight-bold">
        تفاصيل الشهادة
        <VSpacer />
        <VBtn
          icon
          color="error"
          variant="outlined"
          rounded="circle"
          @click="isDialogOpen = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VRow>
          <VCol cols="12">
            <AppTextField
              v-model="body.itemName"
              label="اسم المادة"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.iqdPrice"
              label="سعر الصرف بالدينار العراقي"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="body.usdPrice"
              label="سعر الصرف بالدولار"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.quantity"
              label="العدد"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="body.corNumber"
              label="رقم الـ COR"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppSelectField
              v-model="body.coordinatorCodeId"
              item-label="code"
              item-value="id"
              label="رقم المنسق"
              get-url="/coordinator-codes"
              :sw="true"
              sub-title-label="deatials"
            />
          </VCol>
          <VCol cols="12">
            <AppTextarea
              v-model="body.description"
              label="الوصف"
            />
          </VCol>
          <VCol cols="12">
            <div class="d-flex">
              <VSpacer />
              <VBtn
                :loading="isLoading"
                color="primary"
                @click="submit"
              >
                منح شهادة الاستيراد
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
