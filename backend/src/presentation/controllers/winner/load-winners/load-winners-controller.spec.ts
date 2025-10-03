import { throwError } from '../../../../data/test/test-helper'
import { mockWinnerModel } from '../../../../domain/test/mock-winner'
import { LoadWinners } from '../../../../domain/use-cases/winner/load-winners'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { mockLoadWinners } from '../../../test'
import { LoadWinnersController } from './load-winners-controller'


type SutTypes = {
  sut: LoadWinnersController
  loadWinnersStub: LoadWinners
}

const makeSut = (): SutTypes => {
  const loadWinnersStub = mockLoadWinners()
  const sut = new LoadWinnersController(loadWinnersStub)

  return {
    sut,
    loadWinnersStub
  }
}

describe('LoadWinners Controller', () => {
  test('Should call LoadWinners', async () => {
    const { sut, loadWinnersStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadWinnersStub, 'loadAll')
    await sut.handle()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadWinners throws', async () => {
    const { sut, loadWinnersStub } = makeSut()
    jest.spyOn(loadWinnersStub, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with winners list on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([mockWinnerModel(), mockWinnerModel()]))
  })
})
