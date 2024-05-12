<script lang="ts" setup>
import { tableFields, types } from './fields'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useUserStore } from '@/stores/UserStore'
import Attachments from '@/views/pages/customers/attachments.vue'
import CustomerDialog from '@/views/pages/customers/customerDialog.vue'

const urls: ApiUrls = {
  get: '/Customers',
  delete: '/Customers',
  create: '/Customers',
  update: '/Customers',
}

const tableStore = useTableStore()
const cusomersStore = useCustomerStore()
const userStore = useUserStore()

const openAttachments = (item: any) => {
  cusomersStore.setEditId(item.id)
  cusomersStore.setAttachmentDialog(true)
}
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="المستفيد"
    :urls="urls"
    add-btn-text="اضافة"
    have-actions
    hide-create
    hide-edit
  >
    <template #customerType.title="{ item }">
      <span>{{ types.find(type => type.id === item.customerType.value)?.arName }}</span>
    </template>
    <template #headerActions>
      <VBtn
        v-if="userStore.havePermission('Customers-Create')"
        variant="tonal"
        @click="cusomersStore.setCusomerDialog(true)"
      >
        <VIcon>mdi-plus</VIcon>
        اضافة مستفيد
      </VBtn>
    </template>
    <template #actions="{ item }">
      <VBtn
        v-if="userStore.havePermission('Customers-Update')"
        color="warning"
        icon
        size="small"
        class="rounded-circle"
        @click="cusomersStore.setEditId(item.id)"
      >
        <VIcon>tabler-edit</VIcon>
      </VBtn>
    </template>
    <template #headerBtns="{ item }">
      <VBtn
        v-if="userStore.havePermission('Customers-Update')"
        color="warning"
        icon
        size="small"
        class="rounded-circle"
        @click="cusomersStore.setEditId(item.id)"
      >
        <VIcon>tabler-edit</VIcon>
      </VBtn>
    </template>
    <template #footer=" { item }">
      <VBtn
        v-if="userStore.havePermission('Customer-UploadAttachment')"
        color="primary"
        block
        @click="openAttachments(item)"
      >
        <VIcon>mdi-attachment-check</VIcon>
        المستندات المرفقة
      </VBtn>
    </template>
  </AppTable>
  <CustomerDialog
    :fields="tableFields"
    :urls="urls"
    @save="tableStore.setRefresh(true)"
  />
  <Attachments />
</template>
