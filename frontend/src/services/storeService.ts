import api from './api'
import type { Store, AddStoreParams } from '@/types/store'

export const storeService = {
  async create(data: AddStoreParams): Promise<Store> {
    const response = await api.post<Store>('/stores', data)
    return response.data
  },

  async getAll(): Promise<Store[]> {
    const response = await api.get<Store[]>('/stores')
    return response.data
  },

  async getById(id: string): Promise<Store> {
    const response = await api.get<Store>(`/stores/${id}`)
    return response.data
  },

  async update(id: string, data: Partial<AddStoreParams>): Promise<Store> {
    const response = await api.patch<Store>(`/stores/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/stores/${id}`)
  }
}
