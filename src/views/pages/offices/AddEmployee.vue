<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useTableStore } from '@/stores/AppTableStore'
import { useOfficeStore } from '@/stores/OfficeStore'
import InfoLabel from '@/views/pages/delivery-order/InfoLabel.vue'
import axios from '@axios'

const tableStore = useTableStore()
const officeStore = useOfficeStore()
const isDialogOpen = computed(() => officeStore.isAddEmployee)
const officeId = computed(() => officeStore.dataEmployee)
const employeeId = ref()
const employees = ref([])
const currentPage = ref(1)
const pagesCount = ref(1)
const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true

  const { data } = await axios.get(`/User?officeId=${officeId.value.id}`, {
    params: {
      take: 10,
      skip: (currentPage.value - 1),
    },
  })

  pagesCount.value = data.result.count / 10
  employees.value = data.result.data
  isLoading.value = false
}

const saveManager = async () => {
  try {
    await axios.post(`/Office/${officeId.value.id}/employee`, {
      employeesId: [employeeId.value],
    })
    isLoading.value = true

    fetchData()
    toast.success('تم الحفظ بنجاح')
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

const deleteEmployee = async (id: string) => {
  try {
    isLoading.value = true
    await axios.delete(`/Office/${officeId.value.id}/employee`, {
      data: {
        employeesId: [id],
      },
    })
    toast.success('تم الحذف بنجاح')
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(isDialogOpen, val => {
  if (val)
    fetchData()
})
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="headline">
          اضافة موظفين للمكتب
        </span>
        <VSpacer />
        <VBtn
          color="error"
          icon
          class="rounded-circle"
          @click="officeStore.setAddEmployee(false, '')"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex align-center gap-5">
          <AppSelectField
            v-model="employeeId"
            label="اختر الموظف"
            get-url="/User?generalRoleId=6"
            item-label="fullName"
            item-value="id"
            outlined
          />
          <VBtn
            class="mt-5"
            color="primary"
            :loading="isLoading"
            @click="saveManager"
          >
            اضافة الموظف
          </VBtn>
        </div>
      </VCardText>
      <VRow class="pa-5">
        <VCol cols="12">
          <h4 class="text-h4">
            موظفين المكتب
          </h4>
          <p
            v-if="employees.length === 0"
            class="text-caption mt-3"
          >
            لا يوجد موظفين لهذا المكتب
          </p>
        </VCol>
        <VCol
          v-for="employee in employees"
          :key="employee"
          cols="12"
          md="6"
        >
          <VCard outlined class="border-3 border-primary">
            <VCardTitle class="pa-5 d-flex align-center border-3 border-primary">
              <InfoLabel
                label="الاسم"
                :value="employee.fullName"
                icon="tabler-user-plus"
              />
              <VSpacer />
              <VBtn
                color="error"
                rounded="circle"
                icon
                @click="deleteEmployee(employee.id)"
              >
                <VIcon size="24">
                  mdi-delete
                </VIcon>
              </VBtn>
            </VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="12">
          <div class="d-flex justify-center">
            <VPagination
              v-model="currentPage"
              :length="pagesCount + 1"
              :total-visible="5"
              @update:model-value="fetchData"
            />
          </div>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>
