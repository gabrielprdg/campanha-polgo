import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbDeleteWinnerById } from '../../../../../data/use-cases/winner/delete-winner-by-id/db-delete-winner-by-id'

export const makeDbDeleteWinnerById = (): DbDeleteWinnerById => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbDeleteWinnerById(winnerMongoRepository)
}