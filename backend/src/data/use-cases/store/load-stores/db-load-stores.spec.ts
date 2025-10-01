import { LoadStoresRepository } from '../../../protocols/db/load-stores-repository'
import { mockLoadStoresRepository } from '../../../test/mock-db-store'
import { throwError } from '../../../test/test-helper'
import { mockStoreModel } from '../../../../domain/test/mock-store'
import { DbLoadStores } from './db-load-stores'

type SutTypes = {
  sut: DbLoadStores
  loadStoresRepositoryStub: LoadStoresRepository
}

const makeSut = (): SutTypes => {
  const loadStoresRepositoryStub = mockLoadStoresRepository()
  const sut = new DbLoadStores(loadStoresRepositoryStub)

  return {
    sut,
    loadStoresRepositoryStub
  }
}

describe('DbLoadStores Usecase', () => {
  it('Should call LoadStoresRepository', async () => {
    const { sut, loadStoresRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadStoresRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('Should return a list of Stores on success', async () => {
    const { sut } = makeSut()
    const stores = await sut.loadAll()
    expect(stores).toEqual([mockStoreModel()])
  })

  it('Should throw if LoadStoresRepository throws', async () => {
    const { sut, loadStoresRepositoryStub } = makeSut()
    jest.spyOn(loadStoresRepositoryStub, 'loadAll').mockImplementationOnce(throwError)

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
