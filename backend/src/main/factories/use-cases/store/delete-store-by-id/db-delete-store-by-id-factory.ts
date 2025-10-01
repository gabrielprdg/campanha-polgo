import { StoreMongoRepository } from '../../../../../infra/mongoDB/store/store-repository'
import { DbDeleteStoreById } from '../../../../../data/use-cases/store/delete-store-by-id/db-delete-store-by-id'

export const makeDbDeleteStoreById = (): DbDeleteStoreById => {
  const storeMongoRepository = new StoreMongoRepository()
  return new DbDeleteStoreById(storeMongoRepository)
}
