import { StoreModel } from '../../models/store'

export type AddStoreParams = Omit<StoreModel, 'id'>

export interface AddStore {
  add: (storeData: AddStoreParams) => Promise<StoreModel>
}
