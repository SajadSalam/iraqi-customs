import { isLoading, paths } from './AppFileUploader.vue'

const upload = async (file: File) => {
  try {
    isLoading.value = true

    const formData = new FormData()

    formData.append('file', file)

    const { data } = await axios.post('/FileUpload', formData)

    paths.value = data
  }
  catch (error) {
    toast.error(error.response?.data.title ?? 'حدث خطأ ما')
  }
  finally {
    isLoading.value = false
  }
}
