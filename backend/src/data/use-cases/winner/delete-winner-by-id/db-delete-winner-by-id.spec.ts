import { DeleteWinnerByIdRepository } from '../../../protocols/db/delete-winner-by-id-repository'
import { mockDeleteWinnerByIdRepository } from '../../../test/mock-db-winner'
import { throwError } from '../../../test/test-helper'
import { DbDeleteWinnerById } from './db-delete-winner-by-id'

type SutTypes = {
  sut: DbDeleteWinnerById
  deleteWinnerByIdRepositoryStub: DeleteWinnerByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteWinnerByIdRepositoryStub = mockDeleteWinnerByIdRepository()
  const sut = new DbDeleteWinnerById(deleteWinnerByIdRepositoryStub)

  return {
    sut,
    deleteWinnerByIdRepositoryStub
  }
}

describe('DbDeleteWinnerById Usecase', () => {
  it('Should call DeleteWinnerByIdRepository with correct id', async () => {
    const { sut, deleteWinnerByIdRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteWinnerByIdRepositoryStub, 'deleteById')
    await sut.deleteById('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if DeleteWinnerByIdRepository throws', async () => {
    const { sut, deleteWinnerByIdRepositoryStub } = makeSut()
    jest.spyOn(deleteWinnerByIdRepositoryStub, 'deleteById').mockImplementationOnce(throwError)

    const promise = sut.deleteById('any_id')
    await expect(promise).rejects.toThrow()
  })
})