import { makeDbLoadWinnersAggregation } from '../../../use-cases/winner/load-winners-aggregation/db-load-winners-aggregation-factory'
import { LoadWinnersAggregationController } from '../../../../../presentation/controllers/winner/load-winners-aggregation/load-winners-aggregation-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadWinnersAggregationController = (): Controller => {
  return new LoadWinnersAggregationController(makeDbLoadWinnersAggregation())
}
