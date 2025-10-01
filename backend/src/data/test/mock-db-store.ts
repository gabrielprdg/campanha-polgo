import { AddStoreRepository } from '../protocols/db/add-store-repository'
import { LoadStoresRepository } from '../protocols/db/load-stores-repository'
import { LoadStoreByIdRepository } from '../protocols/db/load-store-by-id-repository'
import { UpdateStoreByIdRepository } from '../protocols/db/update-store-by-id-repository'
import { DeleteStoreByIdRepository } from '../protocols/db/delete-store-by-id-repository'
import { mockStoreModel } from '../../domain/test/mock-store'

export const mockAddStoreRepository = (): AddStoreRepository => {
  class AddStoreRepositoryStub implements AddStoreRepository {
    async add(_storeData: any): Promise<any> {
      return mockStoreModel()
    }
  }
  return new AddStoreRepositoryStub()
}

export const mockLoadStoresRepository = (): LoadStoresRepository => {
  class LoadStoresRepositoryStub implements LoadStoresRepository {
    async loadAll(): Promise<any[]> {
      return [mockStoreModel()]
    }
  }
  return new LoadStoresRepositoryStub()
}

export const mockLoadStoreByIdRepository = (): LoadStoreByIdRepository => {
  class LoadStoreByIdRepositoryStub implements LoadStoreByIdRepository {
    async loadById(_id: string): Promise<any> {
      return mockStoreModel()
    }
  }
  return new LoadStoreByIdRepositoryStub()
}

export const mockUpdateStoreByIdRepository = (): UpdateStoreByIdRepository => {
  class UpdateStoreByIdRepositoryStub implements UpdateStoreByIdRepository {
    async update(_id: string, _storeData: any): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateStoreByIdRepositoryStub()
}

export const mockDeleteStoreByIdRepository = (): DeleteStoreByIdRepository => {
  class DeleteStoreByIdRepositoryStub implements DeleteStoreByIdRepository {
    async deleteById(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new DeleteStoreByIdRepositoryStub()
}
