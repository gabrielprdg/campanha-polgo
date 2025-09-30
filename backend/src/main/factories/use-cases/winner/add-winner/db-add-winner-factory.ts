import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbAddWinner } from '../../../../../data/use-cases/winner/add-winner/db-add-winner'

export const makeDbAddWinner = (): DbAddWinner => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbAddWinner(winnerMongoRepository)
}