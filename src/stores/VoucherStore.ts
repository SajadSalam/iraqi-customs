export const useVoucherStore = defineStore("voucher", () => {
  const data = ref<any[]>([]);
  const voucherOnlyDialog = ref<boolean>(false);
  const voucherCatchDialog = ref<boolean>(false);
  const voucherInsuranceDialog = ref<boolean>(false);
  const isEdit = ref<boolean>(false);
  const itemId = ref<string>("");
  const openEdit = (id: string) => {
    isEdit.value = true;
    itemId.value = id;
    voucherOnlyDialog.value = true;
  };
  const closeEdit = () => {
    isEdit.value = false;
    itemId.value = "";
  };
  const setVoucherOnlyDialog = (value: boolean) => {
    voucherOnlyDialog.value = value;
  };
  const setVoucherCatchDialog = (value: boolean) => {
    voucherCatchDialog.value = value;
  };
  const setVoucherInsuranceDialog = (value: boolean) => {
    voucherInsuranceDialog.value = value;
  };
  const setDataProductManifest = (newData: any[]) => {
    data.value = newData;
  };

  return {
    voucherOnlyDialog,
    setVoucherOnlyDialog,
    voucherCatchDialog,
    setVoucherCatchDialog,
    voucherInsuranceDialog,
    setVoucherInsuranceDialog,
    data,
    setDataProductManifest,
    openEdit,
    isEdit,
    itemId,
    closeEdit,
  };
});
