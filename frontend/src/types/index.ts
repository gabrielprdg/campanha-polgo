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

export interface APIResponse<T> {
  data: T
  message: string
  success: boolean
}