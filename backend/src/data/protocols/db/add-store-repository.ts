import { AddStoreParams } from '../../../domain/use-cases/store/add-store'
import { StoreModel } from '../../../domain/models/store'

export interface AddStoreRepository {
  add: (storeData: AddStoreParams) => Promise<StoreModel>
}
