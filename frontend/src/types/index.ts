// Global type definitions
export interface Campaign {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
}

export interface NavigationItem {
  name: string
  href: string
  icon?: string
}

export interface Store {
  id?: number
  name: string
  cnpj: string
  state: string
  city: string
  address: string
  createdAt?: string
  updatedAt?: string
}

export interface Winner {
  id?: number
  name: string
  state: string
  city: string
  prize: string
  date: string
  createdAt?: string
  updatedAt?: string
}

export interface FormField {
  key: keyof Store | keyof Winner
  label: string
  type: 'text' | 'select' | 'date'
  required: boolean
  options?: string[]
  validation?: (value: string) => string | null
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface APIResponse<T> {
  data: T
  message: string
  success: boolean
  pagination?: PaginationData
}

export interface ApiError {
  message: string
  status?: number
}