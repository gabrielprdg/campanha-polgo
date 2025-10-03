import { LoadWinnersAggregationRepository } from '../../../protocols/db/load-winners-aggregation-repository'
import { throwError } from '../../../test/test-helper'
import { DbLoadWinnersAggregation } from './db-load-winners-aggregation'

const mockWinnersAggregation = () => [
  { state: 'SP', count: 10 },
  { state: 'RJ', count: 5 }
]

const mockLoadWinnersAggregationRepository = (): LoadWinnersAggregationRepository => {
  class LoadWinnersAggregationRepositoryStub implements LoadWinnersAggregationRepository {
    async loadAggregationByState() {
      return mockWinnersAggregation()
    }
  }
  return new LoadWinnersAggregationRepositoryStub()
}

type SutTypes = {
  sut: DbLoadWinnersAggregation
  loadWinnersAggregationRepositoryStub: LoadWinnersAggregationRepository
}

const makeSut = (): SutTypes => {
  const loadWinnersAggregationRepositoryStub = mockLoadWinnersAggregationRepository()
  const sut = new DbLoadWinnersAggregation(loadWinnersAggregationRepositoryStub)

  return {
    sut,
    loadWinnersAggregationRepositoryStub
  }
}

describe('DbLoadWinnersAggregation Usecase', () => {
  it('Should call LoadWinnersAggregationRepository', async () => {
    const { sut, loadWinnersAggregationRepositoryStub } = makeSut()
    const loadAggregationByStateSpy = jest.spyOn(loadWinnersAggregationRepositoryStub, 'loadAggregationByState')
    await sut.loadByState()
    expect(loadAggregationByStateSpy).toHaveBeenCalled()
  })

  it('Should return aggregation data on success', async () => {
    const { sut } = makeSut()
    const aggregation = await sut.loadByState()
    expect(aggregation).toEqual(mockWinnersAggregation())
  })

  it('Should throw if LoadWinnersAggregationRepository throws', async () => {
    const { sut, loadWinnersAggregationRepositoryStub } = makeSut()
    jest.spyOn(loadWinnersAggregationRepositoryStub, 'loadAggregationByState').mockImplementationOnce(throwError)

    const promise = sut.loadByState()
    await expect(promise).rejects.toThrow()
  })
})
