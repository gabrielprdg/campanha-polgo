import { WinnerModel } from '../../../domain/models/winner'

export interface LoadWinnersRepository {
  loadAll: () => Promise<WinnerModel[]>
}