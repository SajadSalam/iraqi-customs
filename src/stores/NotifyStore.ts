import { toast } from 'vue3-toastify'

export const useNotifyStore = defineStore('notify', () => {
  const showNotification = (notification: string) => {
    toast.success(notification)
  }

  return {
    showNotification,
  }
})
