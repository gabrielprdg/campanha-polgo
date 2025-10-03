import { WinnerMongoRepository } from '../../../../../infra/mongoDB/winner/winner-repository'
import { DbLoadWinnersAggregation } from '../../../../../data/use-cases/winner/load-winners-aggregation/db-load-winners-aggregation'

export const makeDbLoadWinnersAggregation = (): DbLoadWinnersAggregation => {
  const winnerMongoRepository = new WinnerMongoRepository()
  return new DbLoadWinnersAggregation(winnerMongoRepository)
}
