import { UpdateStoreParams } from '../../../domain/use-cases/store/update-store-by-id'

export interface UpdateStoreByIdRepository {
  update: (id: string, storeData: UpdateStoreParams) => Promise<void>
}
