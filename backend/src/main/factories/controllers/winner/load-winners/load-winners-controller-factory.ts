import { makeDbLoadWinners } from '../../../use-cases/winner/load-winners/db-load-winners-factory'
import { LoadWinnersController } from '../../../../../presentation/controllers/winner/load-winners/load-winners-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadWinnersController = (): Controller => {
  return new LoadWinnersController(makeDbLoadWinners())
}