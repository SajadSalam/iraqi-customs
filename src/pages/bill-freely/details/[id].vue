<script lang="ts" setup>
import moment from "moment";
import { onMounted } from "vue";
import { payTypes } from "@/constants/enums";
import InfoLabel from "@/views/pages/delivery-order/InfoLabel.vue";
import axios from "@axios";
import { PayStatusEnum, statusEnumTrip } from "@/constants/enums";

const route = useRoute();
const id = computed(() => route.params.id);
const isLoading = ref(true);
const billData = ref<any[]>([]);
const billDataTax = ref<any[]>([]);

const getBillFreelyById = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get(`/BillFreely/${id.value}`);

    billData.value[0] = data.result;
    billDataTax.value = data.result.taxes.data;
    console.log(billDataTax.value, "billData");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getBillFreelyById();
});

const headers = [
  {
    key: "roleTax",
    label: "ضريبة الدور",
  },
  {
    key: "tax",
    label: "الضريبة",
  },
  {
    key: "discount",
    label: "الخصم",
  },
  {
    key: "description",
    label: "الوصف",
  },
];
</script>

<template>
  <div v-if="!isLoading">
    <VCard v-if="billData != null" class="pa-3" flat>
      <VCardTitle class="d-flex">
        <span class="font-weight-bold flex-grow-1 text-h4">
          تفاصيل الفاتورة البحرية
        </span>
        <VSpacer />
        <VBtn
          color="error"
          variant="tonal"
          fab
          small
          class="mr-3"
          to="/bill-freely"
          >رجوع
          <VIcon>mdi-arrow-left</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText class="mt-5 px-3">
        <VRow justify="space-between" class="w-100">
          <VCol cols="12" md="2">
            <InfoLabel
              label="تاريخ الفاتورة"
              :value="moment(billData[0]?.date).format('YYYY-MM-DD')"
              icon="mdi-calendar"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="رقم الفاتورة"
              :value="billData[0]?.number"
              icon="mdi-numeric"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="مجموع الضريبة"
              :value="billData[0]?.totalTax"
              icon="mdi-cash"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="الضريبة المدفوعة"
              :value="billData[0]?.totalTaxPaid"
              icon="mdi-credit-card-outline"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="نوع الدفع"
              :value="
                payTypes.find((x) => x.value === billData[0]?.payType).arName
              "
              icon="mdi-badge"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="الحالة"
              :value="
                PayStatusEnum.find((x) => x.value === billData[0]?.status)
                  ?.arName
              "
              icon="mdi-badge"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="رقم الرحلة"
              :value="billData[0]?.trip.tripNumber"
              icon="mdi-numeric"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="الباخرة"
              :value="billData[0]?.trip.ship"
              icon="mdi-ship"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="وكيل الباخرة"
              :value="billData[0]?.trip.steamshipAgent"
              icon="mdi-account"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="الوصول للميناء"
              :value="
                billData[0]?.trip.isArrivedToPort === true
                  ? 'وصلت'
                  : 'لم تصل بعد'
              "
              icon="mdi-ship-wheel"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="حالة الرحلة"
              :value="
                statusEnumTrip.find((x) => x.value === billData[0]?.trip.status)
                  ?.arName
              "
              icon="mdi-ship-wheel"
            />
          </VCol>
          <VCol cols="12" md="2">
            <InfoLabel
              label="تاريخ الوصول"
              :value="
                moment(billData[0]?.trip.arrivalDate).format('YYYY-MM-DD HH:mm')
              "
              icon="mdi-ship-wheel"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <VCard flat class="my-3">
      <StaticTable
        class="mt-5"
        :headers="headers"
        :loading="isLoading"
        :data="billDataTax"
      >
      </StaticTable>
    </VCard>
  </div>
  <div v-else class="d-flex justify-center align-center">
    <VProgressCircular indeterminate size="164" color="primary" />
  </div>
</template>
