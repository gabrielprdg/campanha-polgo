import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbLoadWinners } from '../../../../../data/use-cases/winner/load-winners/db-load-winners'

export const makeDbLoadWinners = (): DbLoadWinners => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbLoadWinners(winnerMongoRepository)
}