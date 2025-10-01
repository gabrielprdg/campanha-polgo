import { UpdateStoreByIdRepository } from '../../../protocols/db/update-store-by-id-repository'
import { UpdateStoreById, UpdateStoreParams } from '../../../../domain/use-cases/store/update-store-by-id'

export class DbUpdateStoreById implements UpdateStoreById {
  private readonly updateStoreByIdRepository: UpdateStoreByIdRepository

  constructor (updateStoreByIdRepository: UpdateStoreByIdRepository) {
    this.updateStoreByIdRepository = updateStoreByIdRepository
  }

  async update (id: string, storeData: UpdateStoreParams): Promise<void> {
    await this.updateStoreByIdRepository.update(id, storeData)
  }
}
