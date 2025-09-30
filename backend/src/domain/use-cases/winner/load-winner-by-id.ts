import { WinnerModel } from '../../models/winner'

export interface LoadWinnerById {
  loadById: (id: string) => Promise<WinnerModel>
}