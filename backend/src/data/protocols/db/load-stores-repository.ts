import { StoreModel } from '../../../domain/models/store'

export interface LoadStoresRepository {
  loadAll: () => Promise<StoreModel[]>
}
