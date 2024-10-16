/* eslint-disable regex/invalid */
import router from '@/router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import appsettings from '../../public/appsettings.json'

export const baseURL = appsettings.baseURL

// export const baseURL = 'https://api.sinbad-iq.com/'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: `${baseURL}api/v1`,

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')

  config.headers = config.headers || {}
  config.headers['Accept-Language'] = 'ar'
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5MDc0ZTlkZC01Yjk5LTRjODgtYTJhOC1iN2E4MDZlMGZjNzkiLCJ1bmlxdWVfbmFtZSI6IjkwNzRlOWRkLTViOTktNGM4OC1hMmE4LWI3YTgwNmUwZmM3OSIsInJvbGUiOiIxIiwiT2ZmaWNlSWQiOiIiLCJuYmYiOjE3MjkxMTc3MzMsImV4cCI6MTcyOTIwNDEzMywiaWF0IjoxNzI5MTE3NzMzLCJpc3MiOiJUZXN0REJUZXN0REIiLCJhdWQiOiIxIn0.tUWGgYTVhtNfMNnayHgwAjCa0uIauGfaJSG5FYEsZfs'
  if (!config.params)
    config.params = {}

  if (config.method === 'get')
    config.params.deleted = false

  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)

  // Handle error
  if (error.response.status === 401) {
    // ℹ️ Logout user and redirect to login page
    // Remove "userData" from localStorage
    localStorage.removeItem('userData')

    // Remove "accessToken" from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userAbilities')

    // If 401 response returned from api
    router.push('/login')
  }
  else {
    if (error.response.data) {
      if (error.response.status > 499)
        toast.error('حدث خطأ ما يرجى المحاولة مرة أخرى')

      else
        toast.error(error.response.data.message)
    }

    return Promise.reject(error)
  }
})

export default axiosIns
