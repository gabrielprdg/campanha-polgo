import { DeleteStoreByIdRepository } from '../../../protocols/db/delete-store-by-id-repository'
import { DeleteStoreById } from '../../../../domain/use-cases/store/delete-store-by-id'

export class DbDeleteStoreById implements DeleteStoreById {
  private readonly deleteStoreByIdRepository: DeleteStoreByIdRepository

  constructor (deleteStoreByIdRepository: DeleteStoreByIdRepository) {
    this.deleteStoreByIdRepository = deleteStoreByIdRepository
  }

  async deleteById (id: string): Promise<void> {
    await this.deleteStoreByIdRepository.deleteById(id)
  }
}
