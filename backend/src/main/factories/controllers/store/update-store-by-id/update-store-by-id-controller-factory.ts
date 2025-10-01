import { makeDbUpdateStoreById } from '../../../use-cases/store/update-store-by-id/db-update-store-by-id-factory'
import { UpdateStoreByIdController } from '../../../../../presentation/controllers/store/update-store-by-id/update-store-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeUpdateStoreByIdValidation } from './update-store-by-id-validation-factory'

export const makeUpdateStoreByIdController = (): Controller => {
  return new UpdateStoreByIdController(makeUpdateStoreByIdValidation(), makeDbUpdateStoreById())
}
