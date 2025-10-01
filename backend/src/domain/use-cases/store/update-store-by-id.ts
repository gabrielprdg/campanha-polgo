import { StoreModel } from '../../models/store'

export type UpdateStoreParams = Partial<Omit<StoreModel, 'id' | 'created_at' | 'updated_at'>>

export interface UpdateStoreById {
  update: (id: string, storeData: UpdateStoreParams) => Promise<void>
}
