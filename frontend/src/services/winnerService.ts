import api from './api'
import type { Winner, AddWinnerParams } from '@/types/winner'

export const winnerService = {
  async create(data: AddWinnerParams): Promise<Winner> {
    const response = await api.post<Winner>('/winners', data)
    return response.data
  },

  async getAll(): Promise<Winner[]> {
    const response = await api.get<Winner[]>('/winners')
    return response.data
  },

  async getById(id: string): Promise<Winner> {
    const response = await api.get<Winner>(`/winners/${id}`)
    return response.data
  },

  async update(id: string, data: Partial<AddWinnerParams>): Promise<Winner> {
    const response = await api.patch<Winner>(`/winners/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/winners/${id}`)
  }
}
