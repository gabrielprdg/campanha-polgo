import { makeDbAddStore } from '../../../use-cases/store/add-store/db-add-store-factory'
import { AddStoreController } from '../../../../../presentation/controllers/store/add-store/add-store-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeAddStoreValidation } from './add-store-validation-factory'

export const makeAddStoreController = (): Controller => {
  return new AddStoreController(makeAddStoreValidation(), makeDbAddStore())
}
