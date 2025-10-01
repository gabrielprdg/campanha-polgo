import { UpdateStoreByIdRepository } from '../../../protocols/db/update-store-by-id-repository'
import { mockUpdateStoreByIdRepository } from '../../../test/mock-db-store'
import { throwError } from '../../../test/test-helper'
import { DbUpdateStoreById } from './db-update-store-by-id'

type SutTypes = {
  sut: DbUpdateStoreById
  updateStoreByIdRepositoryStub: UpdateStoreByIdRepository
}

const makeSut = (): SutTypes => {
  const updateStoreByIdRepositoryStub = mockUpdateStoreByIdRepository()
  const sut = new DbUpdateStoreById(updateStoreByIdRepositoryStub)

  return {
    sut,
    updateStoreByIdRepositoryStub
  }
}

describe('DbUpdateStoreById Usecase', () => {
  it('Should call UpdateStoreByIdRepository with correct values', async () => {
    const { sut, updateStoreByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStoreByIdRepositoryStub, 'update')
    const updateData = { name: 'Updated Store' }
    await sut.update('any_id', updateData)
    expect(updateSpy).toHaveBeenCalledWith('any_id', updateData)
  })

  it('Should throw if UpdateStoreByIdRepository throws', async () => {
    const { sut, updateStoreByIdRepositoryStub } = makeSut()
    jest.spyOn(updateStoreByIdRepositoryStub, 'update').mockImplementationOnce(throwError)

    const promise = sut.update('any_id', { name: 'Updated Store' })
    await expect(promise).rejects.toThrow()
  })
})
