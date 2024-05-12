<script lang="ts" setup>
import moment from 'moment'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import { useUserStore } from '@/stores/UserStore'
import LeaveDialog from '@/views/pages/trips/leaveDialog.vue'
import TripPortTerminal from '@/views/pages/trips/trip-port/tripPortTerminal.vue'
import TripPortDialog from '@/views/pages/trips/tripPortDialog.vue'
import axios from '@axios'

const userStore = useUserStore()
const tablerStore = useTableStore()
const tableStore = useTableStore()
const tripStore = useTripStore()

const router = useRouter()
const route = useRoute()
const id = computed(() => route.params.id)

const urls: ApiUrls = {
  get: `/tripPort?tripId=${id.value}`,
  delete: '/trip',
  create: '/trip',
  update: '/trip',
}

const fields: TableField[] = [
  {
    label: 'الميناء',
    key: 'port.name',
    field: {
      type: FieldType.Text,
      options: {
        takeFrom: 'port.name',
      },
    },
  },
  {
    label: 'تاريخ القدوم',
    key: 'arrivalDate',
    field: {
      cols: 12,
    },
  },
  {
    label: 'تاريخ الدخول',
    key: 'entryDate',
    field: {
      cols: 12,
    },
  },
  {
    label: 'تاريخ المغادرة',
    key: 'exitDate',
    field: {
      cols: 12,
    },
  },
]

const trip = computed(() => tripStore.trip)
const isLoading = ref(false)

const fetchTrip = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/trip/${id.value}`)

    tripStore.setTrip(data.result)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTrip()
})

const openTripPortTerminalDialog = async (id: string) => {
  const res = await axios.get(`/tripPort/${id}`)

  tripStore.setTripPort(res.data.result)
  tripStore.setTripPortTerminalDialog(true)
}

const openTripPort = async (item: { id: string }) => {
  router.push(`/trips-port-terminal/${item.id}`)
}

const openLeave = (item: any) => {
  tripStore.setExitId(item.id)
  tripStore.setLeaveDialog(true)
}

const openEdit = (item: any) => {
  tripStore.setEditTripPortDate(true)
  tripStore.setItem(item)
}
</script>

<template>
  <div v-if="!isLoading">
    <VRow class="bg-white mx-2 rounded pa-5">
      <VCol
        cols="12"
        md="3"
      >
        <VCard
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-ship-wheel
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  رقم الرحلة
                </p>
                <p class="ma-0 text-h3">
                  {{ trip.tripNumber }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="5"
      >
        <VCard
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-calendar
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  تاريخ الوصول
                </p>
                <p class="ma-0 text-h3">
                  {{ moment(trip.arrivalDate).format('YYYY-MM-DD HH:ss A') }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          v-if="trip.financialYear"
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-cash-multiple
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  السنة المالية
                </p>
                <p class="ma-0 text-h3">
                  {{ trip.financialYear.number }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
    </VRow>
    <AppTable
      :on-row-click="openTripPort"
      disable-crud
      hide-edit
      :have-actions="false"
      :fields="fields"
      :urls="urls"
      pagination
      title="الرحلات - وصول الباخرة للميناء"
    >
      <template #headerActions>
        <VBtn
          v-if="userStore.havePermission('TripPort-Create')"
          color="primary"
          variant="tonal"
          @click="tripStore.setTripPortDialog(true)"
        >
          <VIcon class="ml-2">
            mdi-plus
          </VIcon>
          اضافة وصول جديد
        </VBtn>
        <VBtn
          color="error"
          class="mx-2"
          variant="outlined"
          @click="router.go(-1)"
        >
          <VIcon class="mlx-2">
            mdi-arrow-left
          </VIcon>
          رجوع
        </VBtn>
      </template>
      <template #headerBtns="{ item }">
        <VBtn
          color="warning"
          icon
          class="rounded-circle"
          size="small"
          @click.stop="openEdit(item)"
        >
          <VIcon>tabler-edit</VIcon>
        </VBtn>
      </template>

      <template #arrivalDate="{ item }">
        <VChip color="success">
          {{ moment(item.arrivalDate).format('YYYY-MM-DD HH:ss A') }}
        </VChip>
      </template>
      <template #entryDate="{ item }">
        <VChip color="warning">
          {{ moment(item.entryDate).format('YYYY-MM-DD HH:ss A') }}
        </VChip>
      </template>
      <template #exitDate="{ item }">
        <VChip color="error">
          {{ item.exitDate ? moment(item.exitDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>

      <template #footer="{ item }">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VBtn
              v-if="item.exitDate == null && userStore.havePermission('Trip-UpdateExitDateTrip')"
              block
              color="error"
              @click.stop="openLeave(item)"
            >
              مغادرة
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VBtn
              v-if="userStore.havePermission('TripPortTerminal-CreateTripPortTerminal')"
              color="info"
              block
              @click.stop="openTripPortTerminalDialog(item.id)"
            >
              <VIcon class="ml-2">
                mdi-parking
              </VIcon>
              رسو
            </VBtn>
          </VCol>
        </VRow>
      </template>
    </AppTable>
    <TripPortDialog
      v-if="trip.id"
      @update:refresh="tablerStore.setRefresh(true)"
    />
    <TripPortTerminal
      v-if="trip.id"
      @update:refresh="tablerStore.setRefresh(true)"
    />
    <LeaveDialog type="tripPort" />
  </div>
</template>
