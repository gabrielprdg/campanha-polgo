import { StoreMongoRepository } from '../../../../../infra/mongoDB/store/store-repository'
import { DbUpdateStoreById } from '../../../../../data/use-cases/store/update-store-by-id/db-update-store-by-id'

export const makeDbUpdateStoreById = (): DbUpdateStoreById => {
  const storeMongoRepository = new StoreMongoRepository()
  return new DbUpdateStoreById(storeMongoRepository)
}
