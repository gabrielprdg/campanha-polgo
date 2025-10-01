import { AddStoreRepository } from '../../../protocols/db/add-store-repository'
import { mockAddStoreRepository } from '../../../test/mock-db-store'
import { throwError } from '../../../test/test-helper'
import { mockAddStoreParams, mockStoreModel } from '../../../../domain/test/mock-store'
import { DbAddStore } from './db-add-store'

type SutTypes = {
  sut: DbAddStore
  addStoreRepositoryStub: AddStoreRepository
}

const makeSut = (): SutTypes => {
  const addStoreRepositoryStub = mockAddStoreRepository()
  const sut = new DbAddStore(addStoreRepositoryStub)

  return {
    sut,
    addStoreRepositoryStub
  }
}

describe('DbAddStore Usecase', () => {
  it('Should call AddStoreRepository with correct values', async () => {
    const { sut, addStoreRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStoreRepositoryStub, 'add')
    const storeParams = mockAddStoreParams()
    await sut.add(storeParams)
    expect(addSpy).toHaveBeenCalledWith(storeParams)
  })

  it('Should return a Store on success', async () => {
    const { sut } = makeSut()
    const store = await sut.add(mockAddStoreParams())
    expect(store).toEqual(mockStoreModel())
  })

  it('Should throw if AddStoreRepository throws', async () => {
    const { sut, addStoreRepositoryStub } = makeSut()
    jest.spyOn(addStoreRepositoryStub, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddStoreParams())
    await expect(promise).rejects.toThrow()
  })
})
