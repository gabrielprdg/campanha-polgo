import { StoreMongoRepository } from '../../../../../infra/mongoDB/store/store-repository'
import { DbLoadStores } from '../../../../../data/use-cases/store/load-stores/db-load-stores'

export const makeDbLoadStores = (): DbLoadStores => {
  const storeMongoRepository = new StoreMongoRepository()
  return new DbLoadStores(storeMongoRepository)
}
