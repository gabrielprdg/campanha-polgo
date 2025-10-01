import { makeDbDeleteStoreById } from '../../../use-cases/store/delete-store-by-id/db-delete-store-by-id-factory'
import { DeleteStoreByIdController } from '../../../../../presentation/controllers/store/delete-store-by-id/delete-store-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeDeleteStoreByIdController = (): Controller => {
  return new DeleteStoreByIdController(makeDbDeleteStoreById())
}
