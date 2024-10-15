<script lang="ts" setup>
import { useCustomClearanceService } from '@/pages/custom-clearnace/utils'
import swAxios from '@/plugins/sw-axios'

interface Props {
  deliveryOrderId: string
  customerId: string
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const deliveryOrderId = computed<string>(() => props.deliveryOrderId)
const customerId = computed<string>(() => props.customerId)
const items = ref([])
const customClearanceService = useCustomClearanceService()

watch(() => modelValue.value, async value => {
  if (value) {
    const data = await customClearanceService.fetchDeliveryOrderItems(props.deliveryOrderId)

    items.value = data.goods
  }
})

const body = ref({
  customerId: '',
  deliveryOrder: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  employeeName: 'محمد حسين',
  accountantName: 'كاظم محسن',
  products: [],
})

const isLoading = ref<boolean>(false)
const router = useRouter()

const post = async () => {
  isLoading.value = true
  try {
    body.value.deliveryOrder = deliveryOrderId.value

    body.value.customerId = customerId.value
    items.value.forEach((item: any) => {
      body.value.products.push({
        number: item.number,
        description: item.description,
        country: item.country,
        totalWeight: item.weight,
        quantity: item.quantity,
      })
    })
    await swAxios.post('/custom-clearance', body.value)
    modelValue.value = false
    router.push('/custom-clearnace')
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
    v-model="modelValue"
    width="1100"
  >
    <VCard :loading="isLoading">
      <VCardTitle class="pa-5">
        طلب تصريحة كمركية
      </VCardTitle>
      <VCardText>
        {{ customerId }}
        <VRow>
          <VCol
            cols="12"
            md="4"
            style="align-self: stretch; border-left: 1px solid #e0e0e0; padding-inline: 0;"
          >
            <h1 class="text-h5 font-weight-bold">
              تفاصيل المبلغ
            </h1>
            <VDivider class="my-3" />
            <div class="pe-3">
              <div class="d-flex aligb-center justify-space-between ">
                <p class="text-disabled font-weight-bold">
                  مبلغ التصريحة الكمركية
                </p>
                <span class="text-h5 font-weight-bold">
                  33,000 د.ع
                </span>
              </div>
              <div class="d-flex aligb-center justify-space-between ">
                <p class="text-disabled font-weight-bold">
                  مبلغ الخصم
                </p>
                <span class="text-h5 font-weight-bold">
                  0 د.ع
                </span>
              </div>
              <div class="d-flex aligb-center justify-space-between ">
                <p class="text-disabled font-weight-bold">
                  المبلغ الكلي
                </p>
                <span class="text-h5 font-weight-bold">
                  33,000 د.ع
                </span>
              </div>
              <!--
                <AppTextField

                v-model="body.accountantName"
                label="اسم المحاسب"
                />
                <AppTextField

                v-model="body.employeeName"
                label="اسم الموظف"
                />
              -->
            </div>
          </VCol>
          <VCol
            cols="12"
            md="8"
            style="padding-inline: 0;"
          >
            <h1 class="text-h5 font-weight-bold px-3">
              تفاصيل بطاقة الدفع الإلكتروني
            </h1>
            <VDivider class="my-3" />
            <div class="px-3">
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    label="رقم البطاقة"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  >
                    <template #prepend-inner>
                      <VIcon
                        class="mx-3"
                        color="primary"
                      >
                        mdi-credit-card
                      </VIcon>
                    </template>
                  </AppTextField>
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    label="رمز الأمان"
                    placeholder="***"
                  >
                    <template #prepend-inner>
                      <VIcon
                        class="mx-3"
                        color="primary"
                      >
                        mdi-lock
                      </VIcon>
                    </template>
                  </AppTextField>
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    label="تاريخ الإنتهاء"
                    placeholder="MM/YY"
                  >
                    <template #prepend-inner>
                      <VIcon
                        class="mx-3"
                        color="primary"
                      >
                        mdi-calendar
                      </VIcon>
                    </template>
                  </AppTextField>
                </VCol>
              </VRow>
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          :loading="isLoading"
          color="error"
          @click="modelValue = false"
        >
          الغاء
        </VBtn>
        <VBtn
          color="primary"
          variant="elevated"
          :loading="isLoading"
          @click="post"
        >
          طلب
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">

</style>
