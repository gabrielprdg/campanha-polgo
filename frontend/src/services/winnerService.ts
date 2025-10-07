import api from './api'
import type { Winner, AddWinnerParams } from '@/types/winner'

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

interface PaginationParams {
  page?: number
  limit?: number
  state?: string
}

interface PaginatedResponse {
  winners: Winner[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface WinnerAggregationByState {
  state: string
  count: number
}

export const winnerService = {
  async create(data: AddWinnerParams): Promise<Winner> {
    const response = await api.post<ApiResponse<Winner>>('/winners', data)
    return response.data.data
  },

  async getAll(): Promise<Winner[]> {
    const response = await api.get<ApiResponse<Winner[]>>('/winners')
    return response.data.data
  },

  async getPaginated(params: PaginationParams = {}): Promise<PaginatedResponse> {
    const { page = 1, limit = 10, state } = params
    const queryParams = new URLSearchParams()

    queryParams.append('page', page.toString())
    queryParams.append('limit', limit.toString())
    if (state) {
      queryParams.append('state', state)
    }

    const response = await api.get<ApiResponse<Winner[]>>(`/winners?${queryParams.toString()}`)

    return {
      winners: response.data.data,
      pagination: response.data.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    }
  },

  async getById(id: string): Promise<Winner> {
    const response = await api.get<ApiResponse<Winner>>(`/winners/${id}`)
    return response.data.data
  },

  async update(id: string, data: Partial<AddWinnerParams>): Promise<Winner> {
    const response = await api.patch<ApiResponse<Winner>>(`/winners/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/winners/${id}`)
  },

  async getAggregationByState(): Promise<WinnerAggregationByState[]> {
    const response = await api.get<ApiResponse<WinnerAggregationByState[]>>('/winners/aggregation')
    return response.data.data
  }
}
