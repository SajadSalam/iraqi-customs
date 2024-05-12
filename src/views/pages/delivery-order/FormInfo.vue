<script lang="ts" setup>
import InfoCard from './InfoCard.vue'
import { formatDate } from '@/@core/utils/formatters'

interface Props {
  trip: any
  tripPort: any
  tripPortTerminal: any
  customer: any
}

const props = defineProps<Props>()

const trip = computed(() => props.trip)
const tripPort = computed(() => props.tripPort)
const tripPortTerminal = computed(() => props.tripPortTerminal)
const customer = computed(() => props.customer)
</script>

<template>
  <VCard flat>
    <VSlideYReverseTransition group>
      <!-- CUSTOMER INFO -->
      <VCardText
        v-if="customer"
        class="pa-1 ma-2 my-5"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <InfoCard
              icon="mdi-office-building-cog"
              title="اسم الشركة"
              :info="customer.customer.company.nameAr"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <InfoCard
              icon="mdi-numeric"
              title="الرقم الضريبي"
              :info="customer.customer.company.taxNumber"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
          >
            <InfoCard
              icon="mdi-document"
              title="شهادة الاستيراد"
            >
              <template #info>
                {{ customer.certificates[0].itemName }} - {{ customer.certificates[0].number }}
                <br>
                <small>
                  IQD: {{ customer.certificates[0].iqdPrice }} - USD: {{ customer.certificates[0].usdPrice }}
                </small>
              </template>
            </InfoCard>
          </VCol>
        </VRow>
      </VCardText>
      <!-- TRIP INFO -->
      <VCardText
        v-if="trip"
        class="pa-1 ma-2 my-5"
      >
        <span class="text-h5 font-weight-bold">
          معلومات الرحلة
        </span>
        <VRow class="my-2">
          <VCol
            cols="12"
            md="12"
          >
            <InfoCard
              icon="mdi-newspaper"
              title="رقم الرحلة"
              :info="trip.tripNumber"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
          >
            <InfoCard
              icon="mdi-calendar"
              title="تاريخ الوصول"
              :info="formatDate(trip.arrivalDate, { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <InfoCard
              icon="mdi-ship"
              title="الباخرة"
              :info="trip?.ship"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <InfoCard
              icon="mdi-calendar"
              title="السنة المالية"
              :info="trip?.financialYear"
            />
          </VCol>
        </VRow>
      </VCardText>
      <!-- Port INFO -->
      <VCardText
        v-if="tripPort"
        class="pa-1 ma-2 my-5"
      >
        <span class="text-h5 font-weight-bold">
          معلومات الميناء
        </span>
        <VRow class="my-2">
          <VCol cols="12">
            <InfoCard
              icon="mdi-building"
              title="اسم الميناء"
              :info="tripPort.port"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
          >
            <InfoCard
              icon="mdi-calendar"
              title="تاريخ الوصول للميناء"
              :info="formatDate(tripPort.arrivalDate, { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })"
            />
          </VCol>
        </VRow>
      </VCardText>
      <!-- Terminal INFO -->
      <VCardText
        v-if="tripPortTerminal"
        class="pa-1 ma-2 my-5"
      >
        <span class="text-h5 font-weight-bold">
          معلومات الرصيف
        </span>
        <VRow class="my-2">
          <VCol cols="12">
            <InfoCard
              icon="mdi-anchor"
              title="اسم الرصيف"
              :info="tripPortTerminal.terminal"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
          >
            <InfoCard
              icon="mdi-calendar"
              title="تاريخ الرسو"
              :info="formatDate(tripPortTerminal.landingDate, { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VSlideYReverseTransition>
  </VCard>
</template>
