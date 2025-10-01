import { makeDbLoadStores } from '../../../use-cases/store/load-stores/db-load-stores-factory'
import { LoadStoresController } from '../../../../../presentation/controllers/store/load-stores/load-stores-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadStoresController = (): Controller => {
  return new LoadStoresController(makeDbLoadStores())
}
