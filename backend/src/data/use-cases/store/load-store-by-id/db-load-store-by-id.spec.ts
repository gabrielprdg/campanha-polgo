import { LoadStoreByIdRepository } from '../../../protocols/db/load-store-by-id-repository'
import { mockLoadStoreByIdRepository } from '../../../test/mock-db-store'
import { throwError } from '../../../test/test-helper'
import { mockStoreModel } from '../../../../domain/test/mock-store'
import { DbLoadStoreById } from './db-load-store-by-id'

type SutTypes = {
  sut: DbLoadStoreById
  loadStoreByIdRepositoryStub: LoadStoreByIdRepository
}

const makeSut = (): SutTypes => {
  const loadStoreByIdRepositoryStub = mockLoadStoreByIdRepository()
  const sut = new DbLoadStoreById(loadStoreByIdRepositoryStub)

  return {
    sut,
    loadStoreByIdRepositoryStub
  }
}

describe('DbLoadStoreById Usecase', () => {
  it('Should call LoadStoreByIdRepository with correct id', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadStoreByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return a Store on success', async () => {
    const { sut } = makeSut()
    const store = await sut.loadById('any_id')
    expect(store).toEqual(mockStoreModel())
  })

  it('Should throw if LoadStoreByIdRepository throws', async () => {
    const { sut, loadStoreByIdRepositoryStub } = makeSut()
    jest.spyOn(loadStoreByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
