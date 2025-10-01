import { makeDbLoadStoreById } from '../../../use-cases/store/load-store-by-id/db-load-store-by-id-factory'
import { LoadStoreByIdController } from '../../../../../presentation/controllers/store/load-store-by-id/load-store-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadStoreByIdController = (): Controller => {
  return new LoadStoreByIdController(makeDbLoadStoreById())
}
