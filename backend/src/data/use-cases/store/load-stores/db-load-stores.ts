import { LoadStoresRepository } from '../../../protocols/db/load-stores-repository'
import { StoreModel } from '../../../../domain/models/store'
import { LoadStores } from '../../../../domain/use-cases/store/load-stores'

export class DbLoadStores implements LoadStores {
  private readonly loadStoresRepository: LoadStoresRepository

  constructor (loadStoresRepository: LoadStoresRepository) {
    this.loadStoresRepository = loadStoresRepository
  }

  async loadAll (): Promise<StoreModel[]> {
    const stores = await this.loadStoresRepository.loadAll()
    return stores
  }
}
