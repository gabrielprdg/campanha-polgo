import { DeleteStoreByIdRepository } from '../../../protocols/db/delete-store-by-id-repository'
import { mockDeleteStoreByIdRepository } from '../../../test/mock-db-store'
import { throwError } from '../../../test/test-helper'
import { DbDeleteStoreById } from './db-delete-store-by-id'

type SutTypes = {
  sut: DbDeleteStoreById
  deleteStoreByIdRepositoryStub: DeleteStoreByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteStoreByIdRepositoryStub = mockDeleteStoreByIdRepository()
  const sut = new DbDeleteStoreById(deleteStoreByIdRepositoryStub)

  return {
    sut,
    deleteStoreByIdRepositoryStub
  }
}

describe('DbDeleteStoreById Usecase', () => {
  it('Should call DeleteStoreByIdRepository with correct id', async () => {
    const { sut, deleteStoreByIdRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStoreByIdRepositoryStub, 'deleteById')
    await sut.deleteById('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if DeleteStoreByIdRepository throws', async () => {
    const { sut, deleteStoreByIdRepositoryStub } = makeSut()
    jest.spyOn(deleteStoreByIdRepositoryStub, 'deleteById').mockImplementationOnce(throwError)

    const promise = sut.deleteById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
