import { AddStoreRepository } from '../../../data/protocols/db/add-store-repository'
import { LoadStoresRepository } from '../../../data/protocols/db/load-stores-repository'
import { LoadStoreByIdRepository } from '../../../data/protocols/db/load-store-by-id-repository'
import { UpdateStoreByIdRepository } from '../../../data/protocols/db/update-store-by-id-repository'
import { DeleteStoreByIdRepository } from '../../../data/protocols/db/delete-store-by-id-repository'
import { StoreModel } from '../../../domain/models/store'
import { AddStoreParams } from '../../../domain/use-cases/store/add-store'
import { UpdateStoreParams } from '../../../domain/use-cases/store/update-store-by-id'
import { StoreMongoModel, StoreDocument } from './store-schema'

export class StoreMongoRepository
  implements
    AddStoreRepository,
    LoadStoresRepository,
    LoadStoreByIdRepository,
    UpdateStoreByIdRepository,
    DeleteStoreByIdRepository
{
  private mapToModel(storeDoc: StoreDocument): StoreModel {
    const model: StoreModel = {
      id: storeDoc._id.toString(),
      name: storeDoc.name,
      cnpj: storeDoc.cnpj,
      state: storeDoc.state,
      city: storeDoc.city,
      address: storeDoc.address
    }

    if (storeDoc.created_at) {
      model.created_at = storeDoc.created_at
    }

    if (storeDoc.updated_at) {
      model.updated_at = storeDoc.updated_at
    }

    return model
  }

  async add(storeData: AddStoreParams): Promise<StoreModel> {
    const store = await StoreMongoModel.create(storeData)
    return this.mapToModel(store)
  }

  async loadAll(): Promise<StoreModel[]> {
    const stores = await StoreMongoModel.find().sort({ created_at: -1 })
    return stores.map(store => this.mapToModel(store))
  }

  async loadById(id: string): Promise<StoreModel | null> {
    const store = await StoreMongoModel.findById(id)
    return store ? this.mapToModel(store) : null
  }

  async update(id: string, storeData: UpdateStoreParams): Promise<void> {
    await StoreMongoModel.findByIdAndUpdate(id, storeData, { new: true })
  }

  async deleteById(id: string): Promise<void> {
    await StoreMongoModel.findByIdAndDelete(id)
  }
}
