import { LoadWinnerByIdRepository } from '../../../protocols/db/load-winner-by-id-repository'
import { mockLoadWinnerByIdRepository } from '../../../test/mock-db-winner'
import { throwError } from '../../../test/test-helper'
import { mockWinnerModel } from '../../../../domain/test/mock-winner'
import { DbLoadWinnerById } from './db-load-winner-by-id'

type SutTypes = {
  sut: DbLoadWinnerById
  loadWinnerByIdRepositoryStub: LoadWinnerByIdRepository
}

const makeSut = (): SutTypes => {
  const loadWinnerByIdRepositoryStub = mockLoadWinnerByIdRepository()
  const sut = new DbLoadWinnerById(loadWinnerByIdRepositoryStub)

  return {
    sut,
    loadWinnerByIdRepositoryStub
  }
}

describe('DbLoadWinnerById Usecase', () => {
  it('Should call LoadWinnerByIdRepository with correct id', async () => {
    const { sut, loadWinnerByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadWinnerByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return a Winner on success', async () => {
    const { sut } = makeSut()
    const winner = await sut.loadById('any_id')
    expect(winner).toEqual(mockWinnerModel())
  })

  it('Should throw if LoadWinnerByIdRepository throws', async () => {
    const { sut, loadWinnerByIdRepositoryStub } = makeSut()
    jest.spyOn(loadWinnerByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})