import { StoreModel } from '../models/store'
import { AddStoreParams } from '../use-cases/store/add-store'

export const mockStoreModel = (): StoreModel => ({
  id: 'any_id',
  name: 'Any Store',
  cnpj: '12.345.678/0001-90',
  state: 'SP',
  city: 'São Paulo',
  address: 'Rua Exemplo, 123',
  created_at: new Date(),
  updated_at: new Date()
})

export const mockAddStoreParams = (): AddStoreParams => ({
  name: 'Any Store',
  cnpj: '12.345.678/0001-90',
  state: 'SP',
  city: 'São Paulo',
  address: 'Rua Exemplo, 123'
})
