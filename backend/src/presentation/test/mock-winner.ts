import { WinnerModel } from '../../domain/models/winner'
import { AddWinner, AddWinnerParams } from '../../domain/use-cases/winner/add-winner'
import { LoadWinners } from '../../domain/use-cases/winner/load-winners'
import { LoadWinnerById } from '../../domain/use-cases/winner/load-winner-by-id'
import { UpdateWinnerById, UpdateWinnerParams } from '../../domain/use-cases/winner/update-winner-by-id'
import { DeleteWinnerById } from '../../domain/use-cases/winner/delete-winner-by-id'
import { mockWinnerModel } from '../../domain/test/mock-winner'

export const mockAddWinner = (): AddWinner => {
  class AddWinnerStub implements AddWinner {
    async add(_data: AddWinnerParams): Promise<WinnerModel> {
      return Promise.resolve(mockWinnerModel())
    }
  }
  return new AddWinnerStub()
}

export const mockLoadWinners = (): LoadWinners => {
  class LoadWinnersStub implements LoadWinners {
    async loadAll(): Promise<WinnerModel[]> {
      return Promise.resolve([mockWinnerModel(), mockWinnerModel()])
    }
  }
  return new LoadWinnersStub()
}

export const mockLoadWinnerById = (): LoadWinnerById => {
  class LoadWinnerByIdStub implements LoadWinnerById {
    async loadById(_id: string): Promise<WinnerModel | null> {
      return Promise.resolve(mockWinnerModel())
    }
  }
  return new LoadWinnerByIdStub()
}

export const mockUpdateWinnerById = (): UpdateWinnerById => {
  class UpdateWinnerByIdStub implements UpdateWinnerById {
    async update(_id: string, _data: UpdateWinnerParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateWinnerByIdStub()
}

export const mockDeleteWinnerById = (): DeleteWinnerById => {
  class DeleteWinnerByIdStub implements DeleteWinnerById {
    async deleteById(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new DeleteWinnerByIdStub()
}
