import { makeDbLoadWinnerById } from '../../../use-cases/winner/load-winner-by-id/db-load-winner-by-id-factory'
import { LoadWinnerByIdController } from '../../../../../presentation/controllers/winner/load-winner-by-id/load-winner-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadWinnerByIdController = (): Controller => {
  return new LoadWinnerByIdController(makeDbLoadWinnerById())
}