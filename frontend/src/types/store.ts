export interface Store {
  id: string
  name: string
  cnpj: string
  state: string
  city: string
  address: string
  created_at?: Date
  updated_at?: Date
}

export type AddStoreParams = Omit<Store, 'id' | 'created_at' | 'updated_at'>
