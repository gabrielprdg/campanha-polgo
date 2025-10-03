import { throwError } from '../../../../data/test/test-helper'
import { mockStoreModel } from '../../../../domain/test/mock-store'
import { LoadStores } from '../../../../domain/use-cases/store/load-stores'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { mockLoadStores } from '../../../test'
import { LoadStoresController } from './load-stores-controller'


type SutTypes = {
  sut: LoadStoresController
  loadStoresStub: LoadStores
}

const makeSut = (): SutTypes => {
  const loadStoresStub = mockLoadStores()
  const sut = new LoadStoresController(loadStoresStub)

  return {
    sut,
    loadStoresStub
  }
}

describe('LoadStores Controller', () => {
  test('Should call LoadStores', async () => {
    const { sut, loadStoresStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadStoresStub, 'loadAll')
    await sut.handle()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadStores throws', async () => {
    const { sut, loadStoresStub } = makeSut()
    jest.spyOn(loadStoresStub, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with stores list on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([mockStoreModel(), mockStoreModel()]))
  })
})
