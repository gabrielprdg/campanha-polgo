import { StoreModel } from '../../models/store'

export interface LoadStoreById {
  loadById: (id: string) => Promise<StoreModel | null>
}
