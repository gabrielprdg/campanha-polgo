export interface Winner {
  id: string
  name: string
  state: string
  city: string
  prize: string
  date: Date
  created_at?: Date
  updated_at?: Date
}

export type AddWinnerParams = Omit<Winner, 'id' | 'created_at' | 'updated_at'>
