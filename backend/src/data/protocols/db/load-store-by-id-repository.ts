import { StoreModel } from '../../../domain/models/store'

export interface LoadStoreByIdRepository {
  loadById: (id: string) => Promise<StoreModel | null>
}
