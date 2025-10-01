import { StoreMongoRepository } from '../../../../../infra/mongoDB/store/store-repository'
import { DbLoadStoreById } from '../../../../../data/use-cases/store/load-store-by-id/db-load-store-by-id'

export const makeDbLoadStoreById = (): DbLoadStoreById => {
  const storeMongoRepository = new StoreMongoRepository()
  return new DbLoadStoreById(storeMongoRepository)
}
