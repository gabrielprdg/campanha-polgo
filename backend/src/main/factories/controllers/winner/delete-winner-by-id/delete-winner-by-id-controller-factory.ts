import { makeDbDeleteWinnerById } from '../../../use-cases/winner/delete-winner-by-id/db-delete-winner-by-id-factory'
import { DeleteWinnerByIdController } from '../../../../../presentation/controllers/winner/delete-winner-by-id/delete-winner-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeDeleteWinnerByIdController = (): Controller => {
  return new DeleteWinnerByIdController(makeDbDeleteWinnerById())
}