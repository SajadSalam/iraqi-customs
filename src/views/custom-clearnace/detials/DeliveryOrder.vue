<script lang="ts" setup>
import { formatDate } from '@/@core/utils/formatters'
import { DeliveryOrderStatusEnum } from '@/constants/enums'
import FormCard from '@/views/landing-page/application-form/form-card.vue'
import DeliveryOrderTabs from '@/views/pages/delivery-order-item/DeliveryOrderTabs.vue'
import ItemsTable from '@/views/pages/delivery-order-item/ItemsTable.vue'
import { Tabs } from '@/views/pages/delivery-order-item/types'

interface Props {
  deliveryOrder: any
  deliveryItems: any
}
const props = defineProps<Props>()
const data = computed(() => props.deliveryItems)
const selectedTab = ref<Tabs>(Tabs.Cars)

const goodsData = computed(() => {
  return selectedTab.value === Tabs.Containers
    ? data.value.containers
    : selectedTab.value === Tabs.Cars
      ? data.value.cars
      : data.value.goods
})
</script>

<template>
  <div>
    <FormCard title="المعلومات الاساسية">
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            رقم امر التسليم
          </p>
          <span>
            {{ deliveryOrder.number }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            الحالة
          </p>
          <VChip
            variant="tonal"
            :color="
              DeliveryOrderStatusEnum.find((x) => x.value === deliveryOrder.status)?.color
            "
          >
            {{
              DeliveryOrderStatusEnum.find((x) => x.value === deliveryOrder.status)?.arName
            }}
          </VChip>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            تاريخ التسليم
          </p>
          <span>
            {{ formatDate(deliveryOrder.deliveryDate) }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            اسم الوكيل
          </p>
          <span>
            حسين علي حميد
          </span>
        </VCol>

        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            المدير المفوض
          </p>
          <span>
            {{ deliveryOrder.customer.fullname }}
          </span>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <p class="label-p">
            نوع الرحلة
          </p>
          <span>
            بحرية
          </span>
        </VCol>
      </VRow>
    </FormCard>
    <h3 class="my-3">
      تفاصيل البضائع
    </h3>
    <VCardTitle class="main-tabs">
      <DeliveryOrderTabs v-model="selectedTab" />
    </VCardTitle>
    <ItemsTable
      :tab="selectedTab"
      :loading="false"
      :data="goodsData"
      :has-filter="false"
      :exlude-keys="[
        'product',
        'portSection.name',
        'departmentGarage.name', 'actions', 'operations',
      ]"
    />
  </div>
</template>

