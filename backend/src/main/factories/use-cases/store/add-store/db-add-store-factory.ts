import { StoreMongoRepository } from '../../../../../infra/mongoDB/store/store-repository'
import { DbAddStore } from '../../../../../data/use-cases/store/add-store/db-add-store'

export const makeDbAddStore = (): DbAddStore => {
  const storeMongoRepository = new StoreMongoRepository()
  return new DbAddStore(storeMongoRepository)
}
