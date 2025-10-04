import { WinnerModel } from '../../models/winner'

export interface PaginationParams {
  page: number
  limit: number
  state?: string
}

export interface PaginatedWinnersResult {
  winners: WinnerModel[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LoadWinners {
  loadAll: () => Promise<WinnerModel[]>
  loadPaginated: (params: PaginationParams) => Promise<PaginatedWinnersResult>
}