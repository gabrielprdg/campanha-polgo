import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbUpdateWinnerById } from '../../../../../data/use-cases/winner/update-winner-by-id/db-update-winner-by-id'

export const makeDbUpdateWinnerById = (): DbUpdateWinnerById => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbUpdateWinnerById(winnerMongoRepository)
}