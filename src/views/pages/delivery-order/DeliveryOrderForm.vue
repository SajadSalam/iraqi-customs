<script lang="ts" setup>
import CustomerDialog from '../customers/customerDialog.vue'
import FormInfo from './FormInfo.vue'
import type { Body } from './types'
import { isEmpty } from '@/@core/utils'
import { requiredValidator } from '@/@core/utils/validators'
import { tableFields } from '@/pages/customer/fields'
import swAxios from '@/plugins/sw-axios'
import router from '@/router'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useUserStore } from '@/stores/UserStore'
import axios from '@axios'

const props = defineProps<Props>()

const emits = defineEmits(['update:body'])

const cusomersStore = useCustomerStore()

interface Props {
  isEdit?: boolean
  body: Body
  customer?: any
}
const customer = computed(() => props.customer)
const route = useRoute()
const showInfo = ref(false)
const trips = ref([])
const tripPorts = ref([])
const tripPortTerminals = ref([])
const customers = ref([])
const isLoading = ref(false)
const isUploading = computed(() => route.path.includes('uploading'))

const body = computed({
  get() {
    return props.body
  },
  set(value) {
    emits('update:body', value)
  },
})

const hasAgent = ref(true)
const assignedToAnotherCustomer = ref(true)
const userStore = useUserStore()
const swCustomer = ref(null)

const hasOffice = computed(() => {
  if (isEmpty(userStore.user.office))
    return false

  body.value.officeId = userStore.user.office.id

  return userStore.user.office
})

const getTrips = async () => {
  isLoading.value = true

  const { data } = await axios.get('/trip')

  trips.value = data.result.data
  isLoading.value = false
}

const isEdit = computed(() => {
  return route.fullPath.includes('edit')
})

const selectedTrip = ref(null)

const getTripChildren = async (tripId: string) => {
  isLoading.value = true

  const { data } = await axios.get(`/Trip/${tripId}/trip-ports-terminals`)

  tripPorts.value = data.result.ports
  console.log(data.result.ports)

  isLoading.value = false
}

const selectedTripPort = ref(null)

const selectedTripPortTerminal = ref(null)

const openInfo = () => {
  if (isEdit.value) {
    showInfo.value = false
  }
  else {
    showInfo.value
      = !isEmpty(body.value.tripId)
      || !isEmpty(body.value.tripPortId)
      || !isEmpty(body.value.tripPortTerminalId)
      || !isEmpty(body.value.agentId)
      || (!isEmpty(body.value.tripPortTerminalId))
      || (!isEmpty(body.value.commissionerDirector) && !isEmpty(swCustomer.value))
  }
}

const getCustomers = async () => {
  isLoading.value = true

  const { data } = await axios.get('/customers')

  isLoading.value = false
  customers.value = data.result.data
}

onMounted(async () => {
  if (isEdit.value)
    body.value = props.body

  if (body.value.tripPortTerminalId) {
    body.value.tripId = 'added'
    body.value.tripPortId = 'added'
  }

  getTrips()
  getCustomers()
})
watch(
  () => body.value,
  value => {
    openInfo()
  },
  { deep: true },
)

watch(
  () => body.value.tripId,
  value => {
    if (!isEmpty(value))
      getTripChildren(value as string)

    if (!isUploading.value)
      body.value.tripPortId = null
  },
)

watch(
  () => body.value.tripPortId,
  value => {
    if (!isEmpty(value)) {
      tripPortTerminals.value = tripPorts.value.find(
        tripPort => tripPort.id === value,
      ).terminals
    }

    if (!isUploading.value)
      body.value.tripPortTerminalId = null
  },
)

const post = async () => {
  try {
    isLoading.value = true
    let data = null
    body.value.customerId = body.value.commissionerDirector
    if (isEdit.value)
      data = await axios.put(`/deliveryOrder/${route.params.id}`, body.value)

    else
      data = await axios.post('/deliveryOrder', body.value)

    isLoading.value = false
    data = data.data
    let push = { path: `/delivery-order-item/${data.result.id}` }
    if (isUploading.value) {
      push = {
        path: `/uploading-orders/items/${data.result.id}`,
      }
    }

    router.push(push)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
}

const title = computed(() => {
  return isUploading.value ? 'امر التصدير' : 'امر التسليم'
})

const refreshCusomers = ref(false)

watch(() => body.value.commissionerDirector, async () => {
  swCustomer.value = null

  const { data } = await swAxios.get(`/customer/${body.value.commissionerDirector}/certificates`)

  swCustomer.value = data
  openInfo()
  console.log(data)
})

// const office = computed(() => {

// })
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      style="position: relative;"
      :md="!showInfo ? 12 : 7"
    >
      <VForm :disabled="isLoading">
        <VCard
          :loading="isLoading"
          flat
        >
          <VCardText>
            <p class="text-h5 font-weight-bold">
              <VBtn
                color="warning"
                size="large"

                icon
              >
                <VIcon size="25">
                  tabler-notebook
                </VIcon>
              </VBtn>
              <span class="mx-2">معلومات {{ title }}</span>
            </p>
            <VDivider
              color="primary"
              thickness="3"
              class="mx-5"
            />
            <VRow
              align="center"
              class="mt-2"
            >
              <VCol cols="12">
                <AppSelectField
                  v-model="body.commissionerDirector"
                  label="المدير المفوض"
                  get-url="/Customers?customerType=1"
                  :push-to-list="customer"
                  :rules="[requiredValidator]"
                  :loading="isLoading"
                  :exclude="[body.customerAssigneeId, body.agentId]"
                  item-label="fullname"
                  search-key="fullname"
                  :disabled="isEmpty(body.tripId)"
                  item-value="id"
                />
              </VCol>

              <VCol
                v-if="!hasOffice && !isEdit"
                cols="12"
                md="6"
              >
                <AppSelectField
                  v-model="body.officeId"
                  get-url="/Office"
                  label="المكتب"
                  :rules="[requiredValidator]"
                  :loading="isLoading"
                  :push-to-list="hasOffice"
                  item-label="name"
                  search-key="name"
                  :disabled="isEmpty(body.tripId)"
                  item-value="id"
                />
              </VCol>

              <VCol
                v-if="!isEdit"
                cols="12"
                :md="!hasOffice ? 6 : 6"
              >
                <AppDatePicker
                  v-model="body.deliveryDate"
                  :rules="[requiredValidator]"
                  :label="`تاريخ ${title}`"
                  :loading="isLoading"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                />
              </VCol>
            </VRow>
          </VCardText>
          <!-- Trip Info -->
          <VCardText v-if="!isEdit">
            <p class="text-h5 font-weight-bold">
              <VBtn
                color="primary"
                size="large"

                icon
              >
                <VIcon size="25">
                  mdi-newspaper
                </VIcon>
              </VBtn>
              <span class="mx-2">معلومات الرحلة</span>
            </p>
            <VDivider
              color="primary"
              thickness="3"
              class="mx-5"
            />
            <VCol
              cols="12"
              md="6"
            >
              <AppSelectField
                v-model="body.tripId"
                v-model:object-value="selectedTrip"
                class="mt-2"
                :rules="[requiredValidator]"
                get-url="/trip"
                label="رقم الرحلة"
                :loading="isLoading"
                search-key="tripNumber"
                item-label="tripNumber"
                item-value="id"
              />
            </VCol>
          </VCardText>
          <!-- Trip port and terminal Info -->
          <VCardText v-if="!isEdit">
            <p class="text-h5 font-weight-bold">
              <VBtn
                color="info"
                size="large"

                icon
              >
                <VIcon size="25">
                  tabler-anchor
                </VIcon>
              </VBtn>
              <span class="mx-2">معلومات الميناء والرصيف</span>
            </p>
            <VDivider
              color="primary"
              thickness="3"
              class="mx-5"
            />
            <VRow class="mt-2">
              <VCol
                cols="12"
                md="6"
              >
                <AppSelectField
                  v-model:model-value="body.tripPortId"
                  v-model:object-value="selectedTripPort"
                  :rules="[requiredValidator]"
                  :items="tripPorts"
                  label="الميناء"
                  :loading="isLoading"
                  :disabled="isEmpty(body.tripId)"
                  item-label="port"
                  item-value="id"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppSelectField
                  v-model:model-value="body.tripPortTerminalId"
                  v-model:object-value="selectedTripPortTerminal"
                  :rules="[requiredValidator]"
                  :items="tripPortTerminals"
                  label="الرصيف"
                  :loading="isLoading"
                  item-label="terminal"
                  :disabled="isEmpty(body.tripPortId)"
                  item-value="id"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VForm>
      <div
        flat
        class="sticky-footer"
      >
        <VCardText>
          <div class="d-flex align-center justify-end">
            <VBtn
              color="error"
              class="mx-2"
              @click="$router.push({ name: 'delivery-order' })"
            >
              <VIcon>mdi-close</VIcon>
              الغاء
            </VBtn>
            <VBtn
              color="primary"
              class="mx-2"
              @click="post"
            >
              <VIcon class="ml-2">
                mdi-content-save
              </VIcon>
              حفظ
            </VBtn>
          </div>
        </VCardText>
      </div>
    </VCol>
    <VSlideXTransition leave-absolute>
      <!-- {{ showInfo }} -->
      <VCol
        v-if="showInfo"
        cols="12"
        md="5"
      >
        <FormInfo
          :trip="selectedTrip"
          :trip-port="selectedTripPort"
          :trip-port-terminal="selectedTripPortTerminal"
          :customer="swCustomer"
        />
      </VCol>
    </VSlideXTransition>
  </VRow>
  <CustomerDialog
    :fields="tableFields"
    :urls="{
      get: '/Customers',
      delete: '/Customers',
      create: '/Customers',
      update: '/Customers',
    }"
    @save="refreshCusomers = true"
  />
</template>
