import { AddStore } from '../../../../domain/use-cases/store/add-store'
import { throwError } from '../../../../data/test/test-helper'
import { mockStoreModel } from '../../../../domain/test/mock-store'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { mockAddStore, mockValidation } from '../../../test'
import { HttpRequest, Validation } from '../../../protocols'
import { AddStoreController } from './add-store-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Any Store',
    cnpj: '12.345.678/0001-90',
    state: 'SP',
    city: 'São Paulo',
    address: 'Rua Exemplo, 123'
  }
})

type SutTypes = {
  sut: AddStoreController
  validationStub: Validation
  addStoreStub: AddStore
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addStoreStub = mockAddStore()
  const sut = new AddStoreController(validationStub, addStoreStub)

  return {
    sut,
    validationStub,
    addStoreStub
  }
}

describe('AddStore Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('Validation error'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Validation error')))
  })

  test('Should call AddStore with correct values', async () => {
    const { sut, addStoreStub } = makeSut()
    const addSpy = jest.spyOn(addStoreStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      cnpj: httpRequest.body.cnpj,
      state: httpRequest.body.state,
      city: httpRequest.body.city,
      address: httpRequest.body.address
    })
  })

  test('Should return 500 if AddStore throws', async () => {
    const { sut, addStoreStub } = makeSut()
    jest.spyOn(addStoreStub, 'add').mockImplementationOnce(throwError)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(mockStoreModel()))
  })
})
