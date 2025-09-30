import { AddWinnerRepository } from '../protocols/db/add-winner-repository'
import { LoadWinnersRepository } from '../protocols/db/load-winners-repository'
import { LoadWinnerByIdRepository } from '../protocols/db/load-winner-by-id-repository'
import { UpdateWinnerByIdRepository } from '../protocols/db/update-winner-by-id-repository'
import { DeleteWinnerByIdRepository } from '../protocols/db/delete-winner-by-id-repository'
import { mockWinnerModel } from '../../domain/test/mock-winner'

export const mockAddWinnerRepository = (): AddWinnerRepository => {
  class AddWinnerRepositoryStub implements AddWinnerRepository {
    async add(_winnerData: any): Promise<any> {
      return mockWinnerModel()
    }
  }
  return new AddWinnerRepositoryStub()
}

export const mockLoadWinnersRepository = (): LoadWinnersRepository => {
  class LoadWinnersRepositoryStub implements LoadWinnersRepository {
    async loadAll(): Promise<any[]> {
      return [mockWinnerModel()]
    }
  }
  return new LoadWinnersRepositoryStub()
}

export const mockLoadWinnerByIdRepository = (): LoadWinnerByIdRepository => {
  class LoadWinnerByIdRepositoryStub implements LoadWinnerByIdRepository {
    async loadById(_id: string): Promise<any> {
      return mockWinnerModel()
    }
  }
  return new LoadWinnerByIdRepositoryStub()
}

export const mockUpdateWinnerByIdRepository = (): UpdateWinnerByIdRepository => {
  class UpdateWinnerByIdRepositoryStub implements UpdateWinnerByIdRepository {
    async update(_id: string, _winnerData: any): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateWinnerByIdRepositoryStub()
}

export const mockDeleteWinnerByIdRepository = (): DeleteWinnerByIdRepository => {
  class DeleteWinnerByIdRepositoryStub implements DeleteWinnerByIdRepository {
    async deleteById(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new DeleteWinnerByIdRepositoryStub()
}