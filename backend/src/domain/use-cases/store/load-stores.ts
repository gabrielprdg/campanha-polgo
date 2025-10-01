import { StoreModel } from '../../models/store'

export interface LoadStores {
  loadAll: () => Promise<StoreModel[]>
}
