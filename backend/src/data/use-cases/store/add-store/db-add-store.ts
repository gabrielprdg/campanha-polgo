import { AddStoreRepository } from '../../../protocols/db/add-store-repository'
import { StoreModel } from '../../../../domain/models/store'
import { AddStore, AddStoreParams } from '../../../../domain/use-cases/store/add-store'

export class DbAddStore implements AddStore {
  private readonly addStoreRepository: AddStoreRepository

  constructor (addStoreRepository: AddStoreRepository) {
    this.addStoreRepository = addStoreRepository
  }

  async add (storeData: AddStoreParams): Promise<StoreModel> {
    const store = await this.addStoreRepository.add(storeData)
    return store
  }
}
