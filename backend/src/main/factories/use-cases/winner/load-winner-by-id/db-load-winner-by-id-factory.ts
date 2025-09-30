import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbLoadWinnerById } from '../../../../../data/use-cases/winner/load-winner-by-id/db-load-winner-by-id'

export const makeDbLoadWinnerById = (): DbLoadWinnerById => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbLoadWinnerById(winnerMongoRepository)
}