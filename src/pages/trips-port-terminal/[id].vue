<script lang="ts" setup>
import moment from 'moment'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import DatesDialog from '@/views/pages/trips/datesDialog.vue'
import LeaveDialog from '@/views/pages/trips/leaveDialog.vue'
import TripPortTerminal from '@/views/pages/trips/trip-port/tripPortTerminal.vue'
import axios from '@axios'

const tripStore = useTripStore()

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)

const urls: ApiUrls = {
  get: `/tripPortTerminal?tripPortId=${id.value}`,
  delete: '/trip',
  create: '/trip',
  update: '/trip',
}

const fields: TableField[] = [
  {
    label: 'الرصيف',
    key: 'terminal',

  },

  {
    label: 'تاريخ الرسو',
    key: 'landingDate',
  },
  {
    label: 'تاريخ المغادرة',
    key: 'exitDate',
  },
  {
    label: 'تاريخ بدء التفريغ',
    key: 'dischargeStartDate',
  },
  {
    label: 'تاريخ انتهاء التفريغ',
    key: 'dischargeEndDate',
  },
  {
    label: 'تاريخ بدء التصدير',
    key: 'startExportingDate',
  },
  {
    label: 'تاريخ انهاء التصدير',
    key: 'endExportingDate',
  },

]

const tripPort = computed(() => tripStore.tripPort)
const isLoading = ref(false)

const fetchTrip = async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(`/tripPort/${id.value}`)

    tripStore.setTripPort(data.result)
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

const openLeave = (item: any) => {
  tripStore.setExitId(item.id)
  tripStore.setLeaveDialog(true)
}

const tableStore = useTableStore()

const openDates = (item: any) => {
  tripStore.setTripPortTerminal(item)
  tripStore.setDateBody({
    dischargeStartDate: item.dischargeStartDate,
    dischargeEndDate: item.dischargeEndDate,
    startExportingDate: item.startExportingDate,
    endExportingDate: item.endExportingDate,
    exitDate: item.exitDate,
    landingDate: item.landingDate,
  })
  tripStore.setDatesDialog(true)
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
                  الميناء
                </p>
                <p class="ma-0 text-h3">
                  {{ tripPort.port.name }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
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
                  من ميناء
                </p>
                <p class="ma-0 text-h3">
                  {{ tripPort.fromPort ? tripPort.fromPort.name : 'لا يوجد' }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        v-if="tripPort.arrivalDate"
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
                mdi-calendar
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  تاريخ الوصول
                </p>
                <p class="ma-0 text-h4">
                  {{ moment(tripPort.arrivalDate ?? '').format('YYYY-MM-DD HH:ss A') }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="3"
      >
        <VCard
          v-if="tripPort.entryDate"
          flat
          class="transparent"
        >
          <VCardTitle>
            <div class="d-flex align-center">
              <VIcon
                color="secondary"
                size="50"
              >
                mdi-calendar-arrow-left
              </VIcon>
              <div class="mx-5">
                <p class="ma-0 text-h6">
                  تاريخ الدخول
                </p>
                <p class="ma-0 text-h4">
                  {{ moment(tripPort.entryDate).format('YYYY-MM-DD HH:ss A') }}
                </p>
              </div>
            </div>
          </VCardTitle>
        </VCard>
      </VCol>
    </VRow>
    <AppTable
      disable-crud
      hide-edit
      :have-actions="false"
      :fields="fields"
      :urls="urls"
      pagination
      title=""
    >
      <template #headerActions>
        <VBtn
          variant="tonal"
          color="primary"
          @click="tripStore.setTripPortTerminalDialog(true)"
        >
          <VIcon class="ml-2">
            mdi-plus
          </VIcon>
          رسو جديد
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
      <template #exitDate="{ item }">
        <VChip color="error">
          {{ item.exitDate ? moment(item.exitDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>

      <template #landingDate="{ item }">
        <VChip color="warning">
          {{ item.landingDate ? moment(item.landingDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>
      <template #dischargeStartDate="{ item }">
        <VChip color="warning">
          {{ item.dischargeStartDate ? moment(item.dischargeStartDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>
      <template #dischargeEndDate="{ item }">
        <VChip color="warning">
          {{ item.dischargeEndDate ? moment(item.dischargeEndDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>

      <template #startExportingDate="{ item }">
        <VChip color="warning">
          {{ item.startExportingDate ? moment(item.startExportingDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>
      <template #endExportingDate="{ item }">
        <VChip color="warning">
          {{ item.endExportingDate ? moment(item.endExportingDate).format('YYYY-MM-DD HH:ss A') : 'لا يوجد' }}
        </VChip>
      </template>
      <template #footer="{ item }">
        <VRow justify="center">
          <VCol
            cols="12"
            class="py-0"
            md="6"
          >
            <VBtn
              v-if="item.exitDate == null"
              block
              class="mt-2"
              color="error"
              @click.stop="openLeave(item)"
            >
              مغادرة
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            class="py-0"
            md="6"
          >
            <VBtn
              color="warning"
              class="my-2"
              block
              @click.stop="router.push({ name: 'uploading-orders-id', params: { id: item.id } })"
            >
              اوامر التصدير
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            md="12"
            class="py-0"
          >
            <VBtn
              color="success"
              block
              @click.stop="openDates(item)"
            >
              <VIcon>
                mdi-calendar
              </VIcon>
              تعديل التقويم
            </VBtn>
          </VCol>
        </VRow>
      </template>
    </AppTable>
    <TripPortTerminal @update:refresh="tableStore.setRefresh(true)" />
    <LeaveDialog type="tripPortTerminal" />
    <DatesDialog @update:refresh="tableStore.setRefresh(true)" />
  </div>
</template>
