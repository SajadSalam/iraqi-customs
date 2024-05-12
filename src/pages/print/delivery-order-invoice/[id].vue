<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import { isEmpty } from 'lodash'
import QrcodeVue from 'qrcode.vue'
import axios from '@axios'

const isLoading = ref(true)
const route = useRoute()
const id = computed(() => route.params.id)
const type = computed(() => route.query.type || 0)
const deliveryOrder = ref(null)
const invoice = ref(null)

const fetchInvoice = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`/deliveryOrder/${id.value}/invoice`)

    invoice.value = data.result
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const fetchDeliveryOrder = async () => {
  try {
    const { data } = await axios.get(
      `/deliveryOrder/${id.value}`,
    )

    deliveryOrder.value = data.result
    fetchInvoice()
  }
  catch (error) {
    console.log(error)
  }
  finally {
  }
}

const firstInvoice = computed(() => {
  if (invoice.value) {
    return invoice.value[type.value as number] || {
      operations: [
        {
          count: 0.0,
          operationId: 1,
          operationName: 'حاويات 0 عدد',
          price: 25000.0,
          totalPrice: 0.00,
          raiyaPrice: 0.0,
          creationDate: '2024-01-29T14:49:39.9087202+00:00',
        },
      ],
      payId: null,
      payNumber: null,
      payType: 0,
      payDate: null,
      status: 0,
      totalPrice: 0.0,
      raiyaPrice: 0.0,
      listDate: '2024-01-29T12:00:00',
      listNo: '240000010',
      id: '4b41e56b-b3f7-489f-b053-64139b2ae58f',
      isDeleted: false,
    }
  }

  return ''
})

const allOperations = computed(() => {
  if (invoice.value) {
    return invoice.value.reduce((acc, curr) => {
      return [...acc, ...curr.operations]
    }, [])
  }

  return []
})

const totalPrice = computed(() => {
  if (invoice.value) {
    return invoice.value.reduce((acc, curr) => {
      return acc + curr.totalPrice
    }, 0)
  }

  return 0
})

const raiyaPrice = computed(() => {
  if (invoice.value) {
    return invoice.value.reduce((acc, curr) => {
      return acc + curr.raiyaPrice
    }, 0)
  }

  return 0
})

const exlude = []

onMounted(() => {
  fetchDeliveryOrder()
})
watch(isLoading, () => {
  if (deliveryOrder.value) {
     setTimeout(() => {
       window.print()
     }, 1000)
  }
})

const countWithRayia = (total, raiya) => {
  if (exlude.includes(deliveryOrder.value.number))
    return 50000

  return total + raiya
}
</script>

<template>
  <div
    v-if="!isLoading && !isEmpty(deliveryOrder)"
    class="text-black"
  >
    <!--
      <img
      src="/header_4.svg"
      width="100%"
      class="header"
      >
    -->
    <!--
      <h3 class="text-center text-black font-weight-bold text-h4 my-4">
      فاتورة امر {{ deliveryOrder?.isExport ? 'تصدير' : 'تسليم' }}
      </h3>
    -->
    <!-- <div class="header" /> -->
    <div class="d-flex justify-space-between align-center border-b-4 pa-4 header">
      <div class="text-black">
        <h1>جمهورية العراق</h1>
        <h1>وزارة النقل</h1>
        <h1>الشركة العامة للنقل البحري / البصرة</h1>
        <h1>القسم: بوابة التصدير والاستيراد الالكترونية</h1>
        <h1>agency_bas@scmt.gov.iq</h1>
      </div>
      <img
        src="/logo.png"
        height="120"
      >
      <div dir="ltr">
        <h1>Republic of Iraq</h1>
        <h1>Ministry Of Transport</h1>
        <h1>Iraq State Co. For Maritime Transport / Basrah</h1>
        <h1>Division: Maritime Agencis</h1>
        <h1>agency_bas@scmt.gov.iq</h1>
      </div>
    </div>
    <div class="content">
      <table class="">
        <thead>
          <th
            colspan="3"
            class="first"
          >
            معلومات الوصل
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              رقم الفاتورة : {{ firstInvoice.listNo }}
            </td>
            <td colspan="2">
              المستفيد : {{ deliveryOrder.customerAssignee ? deliveryOrder.customerAssignee.fullname : deliveryOrder.customer.fullname }}
            </td>
          </tr>
          <tr>
            <td>
              امر
              {{ deliveryOrder.isExport ? 'التصدير' : "التسليم" }}

              : {{
                deliveryOrder.number
              }}
            </td>

            <td>
              تاريخ امر {{ deliveryOrder.isExport ? 'التصدير' : "التسليم" }}:
              {{
                formatDate(new Date(deliveryOrder.deliveryDate || '2024-10-01'), 'YYYY/MM/DD')
              }}
            </td>
            <td>
              تاريخ الفاتورة:
              <span dir="ltr">
                {{
                  formatDate(new Date(firstInvoice.listDate) || '2024-10-01', 'YYYY/MM/DD')
                }}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              رقم الرحلة: {{
                deliveryOrder.trip.tripNumber
              }}
            </td>
            <td colspan="2">
              الميناء:
              {{
                deliveryOrder.port.name
              }}
            </td>
          </tr>
          <tr>
            <td>
              تاريخ الرسو: لا يوجد
            </td>
            <td colspan="2">
              الرصيف:
              {{
                deliveryOrder.terminal.name
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3 class="text-h4 font-weight-bold mt-10">
        تفاصيل فاتورة البضاعة
      </h3>
      <table class="my-2">
        <thead>
          <th>العملية</th>
          <th>العدد</th>
          <th>السعر</th>
          <th>المبلغ</th>
          <!-- <th>مبلغ الخدمة الالكترونية</th> -->
          <th>المجموع</th>
        </thead>
        <tbody>
          <tr
            v-for="operation in firstInvoice.operations"
            :key="operation.operationId"
          >
            <td>
              {{ operation.operationName }}
            </td>
            <td>
              {{ operation.count }}
            </td>
            <td>
              {{ countWithRayia(operation.price, 0).toLocaleString() }}
            </td>
            <td>
              {{ countWithRayia(operation.totalPrice, 0).toLocaleString() }}
            </td>
            <!--
              <td>
              {{ operation.raiyaPrice.toLocaleString() }}
              </td>
            -->
            <td>
              {{ countWithRayia(operation.totalPrice, operation.raiyaPrice).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-5 w-100 dashed" />

      <div
        class="pa-4 d-flex align-center justify-space-between w-100 rounded"
        style="border: 1px solid #56727833;"
      >
        <p class="font-weight-black text-h4 text-black mb-0">
          المجموع الكلي
        </p>
        <p class="font-weight-black text-h4 text-black mb-0">
          {{ countWithRayia(totalPrice, raiyaPrice).toLocaleString() }} د.ع
        </p>
      </div>
      <div class="w-100 mt-16">
        <VRow>
          <VCol
            cols="8"
            class="d-flex align-start justify-space-between flex-column"
          >
            <p class="font-weight-reg text-h5 text-black">
              المنظم:
              <!-- {{ deliveryOrder.creationBy.fullName }} -->
            </p>
            <p class="mb-0 text-grey-600">
              *المجموع الكلي شامل اجور الاتمتة الإلكترونية
            </p>
          </VCol>
          <VCol
            cols="4"
            class="d-flex align-end justify-end"
          >
            <!--
              <VImg
              src="/src/assets/images/svg/invoice_qr.svg"
              width="100px"
              />
            -->
            <QrcodeVue :value="id" />
          </VCol>
        </VRow>
      </div>
    </div>
  </div>
  <div
    v-else
    class="d-flex justify-center pt-16 align-center mt-16"
  >
    <VProgressCircular
      indeterminate
      class="mt-16 "
      size="150"
    />
  </div>
</template>

<style lang="scss">
@media print {
  @page { margin: 0; }
  body { margin: 0; }
}

.text-black,
* {
  color: #000 !important;
}

.header {
  h1 {
    font-size: 16px;

    &:nth-child(3) {
      font-size: 14px;
    }
  }

  border-bottom: 2px solid #000;
}

.layout-wrapper {
  background-color: #fff !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.content {
  padding: 20px;
}

.dashed {
  block-size: 10px;
  border-block-end: 3px dashed #c7c6c6;
  inline-size: 100%;
}

table {
  border-radius: 8px !important;
  inline-size: 100%;

  thead {
    border-radius: 8px !important;
    margin: 0 !important;
    background-color: #56727833 !important;
    color: black !important;

    th {
      padding: 10px !important;
      color: black !important;
      font-weight: 700;
      text-align: start;

      &:first-child {
        border-start-start-radius: 10px;
      }

      &:last-child {
        border-start-end-radius: 10px;
      }
    }
  }

  &.totals {
    thead {
      background-color: #56727833 !important;

      th {
        color: black !important;
        font-weight: 500 !important;
        text-align: center !important;
      }
    }

    text-align: center !important;
  }

  tbody {
    tr {
      margin: 0 !important;

      &:hover {
        background: #fff !important;
      }

      td {
        padding: 10px;
        border: 1px solid #c7c6c6;
        margin: 0 !important;
        color: black !important;
        font-weight: 400;
      }

      &:last-child {
        border-radius: 10px !important;

        td {
          &:first-child {
            border-bottom-right-radius: 10px;
          }

          &:last-child {
            border-bottom-left-radius: 10px;
          }
        }
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
