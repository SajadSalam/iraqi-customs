<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/component-name-in-template-casing -->
<script lang="ts" setup>
import moment from 'moment'
import { create, filter, shown } from './fields'
import type { TableField } from '@/components/app-table/types'
import { statusEnumTrip } from '@/constants/enums'
import type { ApiUrls } from '@/models/apiUrls'
import router from '@/router'
import { useTableStore } from '@/stores/AppTableStore'
import { useTripStore } from '@/stores/TripsStore'
import { useUserStore } from '@/stores/UserStore'
import AcceptDialog from '@/views/pages/trips/acceptDialog.vue'
import AddDialog from '@/views/pages/trips/addDialog.vue'
import LeaveDialog from '@/views/pages/trips/leaveDialog.vue'
import ReceiptDialog from '@/views/pages/trips/receiptDialog.vue'
import DripPortDialog from '@/views/pages/trips/tripPortDialog.vue'

const userStore = useUserStore()

const urls: ApiUrls = {
  get: '/Trip',
  delete: '/Trip',
  create: '/Trip',
  update: '/Trip',
}

const tripStore = useTripStore()
const tablerStore = useTableStore()

const tableFields: TableField[] = [

  ...create,
  ...shown,
  ...filter,
]

const openLeave = (item: any) => {
  tripStore.setExitId(item.id)
  tripStore.setLeaveDialog(true)
}

const clicked = (item: any) => {
  if (item.status === 2 && item.isArrivedToPort)
    router.push(`/trips-port/${item.id}`)
}

const openCancelDialog = (item: any) => {
  tripStore.setCancelId(item.id)
  tripStore.setCancelDialog(true)
  console.log(item, tripStore.acceptDialog)
}

const openAddDialog = () => {
  console.log('test')

  tripStore.setAddDialog(true)
}
</script>

<template>
  <AppTable
    :on-row-click="clicked"
    :fields="tableFields"
    pagination
    title="الرحلات"
    :urls="urls"
    add-btn-text="اضافة"
    hide-create
    have-actions
  >
    <template #headerActions>
      <VBtn
        v-if="userStore.havePermission('Trip-CreateTrip')"
        color="primary"
        variant="tonal"
        @click="openAddDialog"
      >
        اضافة
      </VBtn>
    </template>
    <template #cardTitle="{ item }">
      <VChip
        label
        class="mx-4"
        :color="statusEnumTrip.find(x => x.value === item.status)?.color"
      >
        {{
          statusEnumTrip.find(x => x.value === item.status)?.arName }}
      </VChip>
    </template>
    <template #arrivalDate="{ item }">
      <VChip
        color="success"
        label
      >
        {{ moment(item.arrivalDate).format('YYYY-MM-DD HH:mm') }}
      </VChip>
    </template>
    <template #exitDate="{ item }">
      <VChip
        color="error"
        label
      >
        {{ item.exitDate ? moment(item.exitDate).format('YYYY-MM-DD HH:mm') : 'لا يوجد' }}
      </VChip>
    </template>

    <template #footer="{ item }">
      <div v-if="item.status !== 1">
        <VRow
          justify="center"
          class="mt-1"
        >
          <VCol
            v-if="item.isArrivedToPort && userStore.havePermission('Trip-UpdateExitDateTrip')"
            class="py-1"
            cols="12"
          >
            <VBtn
              v-if="userStore.havePermission('-Trip-UpdateExitDateTrip')"
              block
              color="error"
              variant="tonal"
              :md="!item.isArrivedToPort ? 12 : 6"
              @click.stop="openLeave(item)"
            >
              <VIcon>
                mdi-information-box-outline
              </VIcon>
              مغادرة
            </VBtn>
          </VCol>

          <VCol
            v-if="!item.isArrivedToPort && userStore.havePermission('Trip-UpdateScheduleStatusTrip')"
            class="py-1"
            cols="12"
            :md="!item.isArrivedToPort ? 12 : 6"
          >
            <VBtn
              block
              color="primary"
              @click.stop="() => {
                tripStore.setTrip(item)
                tripStore.setTripPortDialog(true)
              }"
            >
              <VIcon>
                mdi-information-box-outline
              </VIcon>
              وصول الى ميناء
            </VBtn>
          </VCol>
        </VRow>
      </div>
      <div v-else>
        <VBtn
          v-if="userStore.havePermission('Trip-UpdateStatusTrip')"
          block
          @click="openCancelDialog(item)"
        >
          موافقة
        </VBtn>
      </div>
    </template>
  </AppTable>
  <LeaveDialog type="trip" />
  <DripPortDialog @update:refresh="tablerStore.setRefresh(true)" />
  <ReceiptDialog />
  <AddDialog @refresh="tablerStore.setRefresh(true)" />
  <AcceptDialog />
</template>
