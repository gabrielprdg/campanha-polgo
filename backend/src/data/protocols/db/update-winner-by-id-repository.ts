import { UpdateWinnerParams } from '../../../domain/use-cases/winner/update-winner-by-id'

export interface UpdateWinnerByIdRepository {
  update: (id: string, winnerData: UpdateWinnerParams) => Promise<void>
}