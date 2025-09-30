import { WinnerModel } from '../models/winner'
import { AddWinnerParams } from '../use-cases/winner/add-winner'

export const mockWinnerModel = (): WinnerModel => ({
  id: 'any_id',
  name: 'Any Winner',
  state: 'SP',
  city: 'São Paulo',
  prize: 'R$ 1000',
  date: new Date(),
  created_at: new Date(),
  updated_at: new Date()
})

export const mockAddWinnerParams = (): AddWinnerParams => ({
  name: 'Any Winner',
  state: 'SP',
  city: 'São Paulo',
  prize: 'R$ 1000',
  date: new Date()
})