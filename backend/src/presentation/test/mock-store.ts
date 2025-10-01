import { StoreModel } from '../../domain/models/store'
import { AddStore, AddStoreParams } from '../../domain/use-cases/store/add-store'
import { LoadStores } from '../../domain/use-cases/store/load-stores'
import { LoadStoreById } from '../../domain/use-cases/store/load-store-by-id'
import { UpdateStoreById, UpdateStoreParams } from '../../domain/use-cases/store/update-store-by-id'
import { DeleteStoreById } from '../../domain/use-cases/store/delete-store-by-id'
import { mockStoreModel } from '../../domain/test/mock-store'

export const mockAddStore = (): AddStore => {
  class AddStoreStub implements AddStore {
    async add(_data: AddStoreParams): Promise<StoreModel> {
      return Promise.resolve(mockStoreModel())
    }
  }
  return new AddStoreStub()
}

export const mockLoadStores = (): LoadStores => {
  class LoadStoresStub implements LoadStores {
    async loadAll(): Promise<StoreModel[]> {
      return Promise.resolve([mockStoreModel(), mockStoreModel()])
    }
  }
  return new LoadStoresStub()
}

export const mockLoadStoreById = (): LoadStoreById => {
  class LoadStoreByIdStub implements LoadStoreById {
    async loadById(_id: string): Promise<StoreModel | null> {
      return Promise.resolve(mockStoreModel())
    }
  }
  return new LoadStoreByIdStub()
}

export const mockUpdateStoreById = (): UpdateStoreById => {
  class UpdateStoreByIdStub implements UpdateStoreById {
    async update(_id: string, _data: UpdateStoreParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateStoreByIdStub()
}

export const mockDeleteStoreById = (): DeleteStoreById => {
  class DeleteStoreByIdStub implements DeleteStoreById {
    async deleteById(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new DeleteStoreByIdStub()
}
