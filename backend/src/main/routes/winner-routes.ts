import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddWinnerController } from '../factories/controllers/winner/add-winner/add-winner-controller-factory'
import { makeLoadWinnersController } from '../factories/controllers/winner/load-winners/load-winners-controller-factory'
import { makeLoadWinnerByIdController } from '../factories/controllers/winner/load-winner-by-id/load-winner-by-id-controller-factory'
import { makeUpdateWinnerByIdController } from '../factories/controllers/winner/update-winner-by-id/update-winner-by-id-controller-factory'
import { makeDeleteWinnerByIdController } from '../factories/controllers/winner/delete-winner-by-id/delete-winner-by-id-controller-factory'
import { makeLoadWinnersAggregationController } from '../factories/controllers/winner/load-winners-aggregation/load-winners-aggregation-controller-factory'

export default (router: Router): void => {
  router.post('/winners', adaptRoute(makeAddWinnerController()))
  router.get('/winners/aggregation', adaptRoute(makeLoadWinnersAggregationController()))
  router.get('/winners', adaptRoute(makeLoadWinnersController()))
  router.get('/winners/:id', adaptRoute(makeLoadWinnerByIdController()))
  router.patch('/winners/:id', adaptRoute(makeUpdateWinnerByIdController()))
  router.delete('/winners/:id', adaptRoute(makeDeleteWinnerByIdController()))
}