import type { ClearanceDetails } from './types'
import swAxios from '@/plugins/sw-axios'
import axios from '@axios'

export const useCustomClearanceService = () => {
  const fetchCustomClearance = async (id: string): Promise<ClearanceDetails> => {
    return (await swAxios.get<ClearanceDetails>(`/custom-clearance/${id}`)).data as ClearanceDetails
  }

  const fetchDeliveryOrder = async (id: string) => {
    return (await axios.get(`/deliveryOrder/${id}`)).data.result
  }

  const fetchDeliveryOrderItems = async (id: string) => {
    return (await axios.get(`/deliveryOrderItem/${id}`)).data.result.data[0]
  }

  const changeStatus = async (id: string, endpoint: 'check' | 'checker' | 'change-status', body?: Record<string, any>) => {
    if (endpoint == 'change-status')
      return await swAxios.put(`/custom-clearance/${id}/change-status`, body)

    else
      return (await swAxios.post(`/custom-clearance/${id}/${endpoint}`, body))
  }

  return {
    fetchCustomClearance,
    fetchDeliveryOrder,
    fetchDeliveryOrderItems,
    changeStatus,
  }
}
