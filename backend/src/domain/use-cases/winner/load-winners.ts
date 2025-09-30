import { WinnerModel } from '../../models/winner'

export interface LoadWinners {
  loadAll: () => Promise<WinnerModel[]>
}