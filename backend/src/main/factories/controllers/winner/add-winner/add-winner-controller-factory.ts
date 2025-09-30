import { makeDbAddWinner } from '../../../use-cases/winner/add-winner/db-add-winner-factory'
import { AddWinnerController } from '../../../../../presentation/controllers/winner/add-winner/add-winner-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeAddWinnerValidation } from './add-winner-validation-factory'

export const makeAddWinnerController = (): Controller => {
  return new AddWinnerController(makeAddWinnerValidation(), makeDbAddWinner())
}