import { throwError } from '../../../../data/test/test-helper'
import { LoadWinnersAggregation } from '../../../../domain/use-cases/winner/load-winners-aggregation'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { LoadWinnersAggregationController } from './load-winners-aggregation-controller'

const mockWinnersAggregation = () => [
  { state: 'SP', count: 10 },
  { state: 'RJ', count: 5 }
]

const mockLoadWinnersAggregation = (): LoadWinnersAggregation => {
  class LoadWinnersAggregationStub implements LoadWinnersAggregation {
    async loadByState() {
      return mockWinnersAggregation()
    }
  }
  return new LoadWinnersAggregationStub()
}

type SutTypes = {
  sut: LoadWinnersAggregationController
  loadWinnersAggregationStub: LoadWinnersAggregation
}

const makeSut = (): SutTypes => {
  const loadWinnersAggregationStub = mockLoadWinnersAggregation()
  const sut = new LoadWinnersAggregationController(loadWinnersAggregationStub)

  return {
    sut,
    loadWinnersAggregationStub
  }
}

describe('LoadWinnersAggregation Controller', () => {
  test('Should call LoadWinnersAggregation', async () => {
    const { sut, loadWinnersAggregationStub } = makeSut()
    const loadByStateSpy = jest.spyOn(loadWinnersAggregationStub, 'loadByState')
    await sut.handle()
    expect(loadByStateSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadWinnersAggregation throws', async () => {
    const { sut, loadWinnersAggregationStub } = makeSut()
    jest.spyOn(loadWinnersAggregationStub, 'loadByState').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with aggregation data on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(mockWinnersAggregation()))
  })
})
