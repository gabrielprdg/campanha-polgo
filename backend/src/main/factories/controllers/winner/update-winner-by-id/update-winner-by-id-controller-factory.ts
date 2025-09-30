import { makeDbUpdateWinnerById } from '../../../use-cases/winner/update-winner-by-id/db-update-winner-by-id-factory'
import { UpdateWinnerByIdController } from '../../../../../presentation/controllers/winner/update-winner-by-id/update-winner-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeUpdateWinnerByIdValidation } from './update-winner-by-id-validation-factory'

export const makeUpdateWinnerByIdController = (): Controller => {
  return new UpdateWinnerByIdController(makeUpdateWinnerByIdValidation(), makeDbUpdateWinnerById())
}