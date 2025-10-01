import { LoadStoreByIdRepository } from '../../../protocols/db/load-store-by-id-repository'
import { StoreModel } from '../../../../domain/models/store'
import { LoadStoreById } from '../../../../domain/use-cases/store/load-store-by-id'

export class DbLoadStoreById implements LoadStoreById {
  private readonly loadStoreByIdRepository: LoadStoreByIdRepository

  constructor (loadStoreByIdRepository: LoadStoreByIdRepository) {
    this.loadStoreByIdRepository = loadStoreByIdRepository
  }

  async loadById (id: string): Promise<StoreModel | null> {
    const store = await this.loadStoreByIdRepository.loadById(id)
    return store
  }
}
