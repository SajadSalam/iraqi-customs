<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import {
  betweenValidator,
  phoneNumValidator,
} from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import axios from '@axios'

const tableStore = useTableStore()

const urls: ApiUrls = {
  get: '/User?roleId=4',
  delete: '/User',
  create: '/User',
  update: '/User',
}

const changeActive = async (item: any) => {
  const res = await axios.put(`/User/${item.id}/active`, {
    active: item.active === 1 ? 0 : 1,
  })

  if (res.status === 200)
    toast.success('تم تغيير الحالة بنجاح')
  tableStore.setRefresh(true)
}

const tableFields: TableField[] = [
  {
    key: 'fullName',
    label: 'الاسم',
    create: true,
    field: {
      validations: [(v: string) => betweenValidator(v, 6, 20)],
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'phoneNumber',
    label: 'رقم الهاتف ',
    icon: 'mdi-phone',
    create: true,
    field: {
      cols: 6,
      validations: [phoneNumValidator],
      type: FieldType.Text,
    },
  },
  {
    key: 'password',
    label: 'كلمة المرور',
    hideInTable: true,
    create: true,
    field: {
      validations: [(v: string) => betweenValidator(v, 6, 20)],
      cols: 6,
      type: FieldType.Password,
    },
  },
  {
    key: 'roleId',
    label: 'الصلاحية',
    hideInTable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Role?generalParentId=4',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },

  {
    key: 'officeId',
    label: 'المكتب',
    hideInTable: true,
    filterable: true,
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/office',
        itemLabel: 'name',
        itemValue: 'id',
      },
    },
  },
  {
    key: 'active',
    label: 'الحالة',
  },
]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="شركات النقل"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
  >
    <template #active="{ item }">
      <VChip :color="item.active ? 'success' : 'error'">
        <VSwitch
          v-model="item.active"
          :color="item.active ? 'success' : 'error'"
          @click="changeActive(item)"
        />
        {{ item.active ? "مفعل" : "غير مفعل" }}
      </VChip>
    </template>
  </AppTable>
</template>
