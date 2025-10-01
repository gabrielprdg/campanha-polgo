import { LoadStoreById } from '../../../../domain/use-cases/store/load-store-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { mockStoreModel } from '../../../../domain/test/mock-store'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { mockLoadStoreById } from '../../../test'
import { HttpRequest } from '../../../protocols'
import { LoadStoreByIdController } from './load-store-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  params: { id: 'any_id' },
  query: {}
})

type SutTypes = {
  sut: LoadStoreByIdController
  loadStoreByIdStub: LoadStoreById
}

const makeSut = (): SutTypes => {
  const loadStoreByIdStub = mockLoadStoreById()
  const sut = new LoadStoreByIdController(loadStoreByIdStub)

  return {
    sut,
    loadStoreByIdStub
  }
}

describe('LoadStoreById Controller', () => {
  test('Should call LoadStoreById with correct id', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadStoreByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if LoadStoreById returns null', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    jest.spyOn(loadStoreByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound(new Error('Store not found')))
  })

  test('Should return 500 if LoadStoreById throws', async () => {
    const { sut, loadStoreByIdStub } = makeSut()
    jest.spyOn(loadStoreByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with store on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockStoreModel()))
  })
})
