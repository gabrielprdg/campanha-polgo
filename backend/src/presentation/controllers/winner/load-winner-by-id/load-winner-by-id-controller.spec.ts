import { LoadWinnerById } from '../../../../domain/use-cases/winner/load-winner-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { mockWinnerModel } from '../../../../domain/test/mock-winner'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { mockLoadWinnerById } from '../../../test'
import { HttpRequest } from '../../../protocols'
import { LoadWinnerByIdController } from './load-winner-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  params: {
    id: 'any_id'
  },
  query: {}
})

type SutTypes = {
  sut: LoadWinnerByIdController
  loadWinnerByIdStub: LoadWinnerById
}

const makeSut = (): SutTypes => {
  const loadWinnerByIdStub = mockLoadWinnerById()
  const sut = new LoadWinnerByIdController(loadWinnerByIdStub)

  return {
    sut,
    loadWinnerByIdStub
  }
}

describe('LoadWinnerById Controller', () => {
  test('Should call LoadWinnerById with correct id', async () => {
    const { sut, loadWinnerByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadWinnerByIdStub, 'loadById')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if LoadWinnerById returns null', async () => {
    const { sut, loadWinnerByIdStub } = makeSut()
    jest.spyOn(loadWinnerByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound(new Error('Winner not found')))
  })

  test('Should return 500 if LoadWinnerById throws', async () => {
    const { sut, loadWinnerByIdStub } = makeSut()
    jest.spyOn(loadWinnerByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with winner on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockWinnerModel()))
  })
})
