import { WinnerModel } from '../../../domain/models/winner'

export interface LoadWinnerByIdRepository {
  loadById: (id: string) => Promise<WinnerModel | null>
}