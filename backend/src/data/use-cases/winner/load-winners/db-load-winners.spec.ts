import { LoadWinnersRepository } from '../../../protocols/db/load-winners-repository'
import { mockLoadWinnersRepository } from '../../../test/mock-db-winner'
import { throwError } from '../../../test/test-helper'
import { mockWinnerModel } from '../../../../domain/test/mock-winner'
import { DbLoadWinners } from './db-load-winners'

type SutTypes = {
  sut: DbLoadWinners
  loadWinnersRepositoryStub: LoadWinnersRepository
}

const makeSut = (): SutTypes => {
  const loadWinnersRepositoryStub = mockLoadWinnersRepository()
  const sut = new DbLoadWinners(loadWinnersRepositoryStub)

  return {
    sut,
    loadWinnersRepositoryStub
  }
}

describe('DbLoadWinners Usecase', () => {
  it('Should call LoadWinnersRepository', async () => {
    const { sut, loadWinnersRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadWinnersRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('Should return a list of Winners on success', async () => {
    const { sut } = makeSut()
    const winners = await sut.loadAll()
    expect(winners).toEqual([mockWinnerModel()])
  })

  it('Should throw if LoadWinnersRepository throws', async () => {
    const { sut, loadWinnersRepositoryStub } = makeSut()
    jest.spyOn(loadWinnersRepositoryStub, 'loadAll').mockImplementationOnce(throwError)

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})