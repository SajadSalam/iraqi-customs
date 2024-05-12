<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import {
  betweenValidator,
  phoneNumValidator,
  requiredValidator,
} from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import axios from '@axios'

const tableStore = useTableStore()

const urls: ApiUrls = {
  get: '/User?roleId=3',
  delete: '/User',
  create: '/User',
  update: '/User',
}

const tableFields: TableField[] = [
  {
    key: 'fullName',
    label: 'الاسم',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 6,
      type: FieldType.Text,
    },
  },
  {
    key: 'phoneNumber',
    label: 'رقم الهاتف ',
    create: true,
    icon: 'mdi-phone',
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
    hideInEdit: true,
    create: true,
    field: {
      validations: [v => betweenValidator(v, 6, 20)],
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
      isHidden: true,
      defualtValue: 3,
      cols: 6,
      type: FieldType.Select,
      options: {
        getURL: '/Role?parentId=3',
        itemLabel: 'id',
        itemValue: 'fullName',
      },
    },
  },

  // {
  //   key: 'officeId',
  //   label: 'المكتب',
  //   hideInTable: true,
  //   create: true,
  //   field: {
  //     cols: 6,
  //     type: FieldType.Select,
  //     options: {
  //       getURL: '/office',
  //       itemLabel: 'name',
  //       itemValue: 'id',
  //     },
  //   },
  // },
  {
    key: 'active',
    label: 'الحالة',
  },
]

const changeActive = async (item: any) => {
  const res = await axios.put(`/User/${item.id}/active`, {
    active: item.active === 1 ? 0 : 1,
  })

  if (res.status === 200)
    toast.success('تم تغيير الحالة بنجاح')
  tableStore.setRefresh(true)
}
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="وكيل الباخرة"
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
