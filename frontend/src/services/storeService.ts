import api from './api'
import type { Store, AddStoreParams } from '@/types/store'

interface ApiResponse<T> {
  success: boolean
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message: string
}

export const storeService = {
  async create(data: AddStoreParams): Promise<Store> {
    const response = await api.post<ApiResponse<Store>>('/stores', data)
    return response.data.data
  },

  async getAll(): Promise<Store[]> {
    const response = await api.get<ApiResponse<Store[]>>('/stores')
    return response.data.data
  },

  async getById(id: string): Promise<Store> {
    const response = await api.get<ApiResponse<Store>>(`/stores/${id}`)
    return response.data.data
  },

  async update(id: string, data: Partial<AddStoreParams>): Promise<Store> {
    const response = await api.patch<ApiResponse<Store>>(`/stores/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/stores/${id}`)
  }
}
