import { UpdateStoreById } from '../../../../domain/use-cases/store/update-store-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { mockUpdateStoreById, mockValidation } from '../../../test'
import { HttpRequest, Validation } from '../../../protocols'
import { UpdateStoreByIdController } from './update-store-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Updated Store',
    state: 'RJ'
  },
  params: { id: 'any_id' }
})

type SutTypes = {
  sut: UpdateStoreByIdController
  validationStub: Validation
  updateStoreByIdStub: UpdateStoreById
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const updateStoreByIdStub = mockUpdateStoreById()
  const sut = new UpdateStoreByIdController(validationStub, updateStoreByIdStub)

  return {
    sut,
    validationStub,
    updateStoreByIdStub
  }
}

describe('UpdateStoreById Controller', () => {
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

  test('Should call UpdateStoreById with correct values', async () => {
    const { sut, updateStoreByIdStub } = makeSut()
    const updateSpy = jest.spyOn(updateStoreByIdStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith('any_id', httpRequest.body)
  })

  test('Should return 500 if UpdateStoreById throws', async () => {
    const { sut, updateStoreByIdStub } = makeSut()
    jest.spyOn(updateStoreByIdStub, 'update').mockImplementationOnce(throwError)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
