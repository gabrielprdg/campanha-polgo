import { DeleteStoreById } from '../../../../domain/use-cases/store/delete-store-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { mockDeleteStoreById } from '../../../test'
import { HttpRequest } from '../../../protocols'
import { DeleteStoreByIdController } from './delete-store-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  params: { id: 'any_id' }
})

type SutTypes = {
  sut: DeleteStoreByIdController
  deleteStoreByIdStub: DeleteStoreById
}

const makeSut = (): SutTypes => {
  const deleteStoreByIdStub = mockDeleteStoreById()
  const sut = new DeleteStoreByIdController(deleteStoreByIdStub)

  return {
    sut,
    deleteStoreByIdStub
  }
}

describe('DeleteStoreById Controller', () => {
  test('Should call DeleteStoreById with correct id', async () => {
    const { sut, deleteStoreByIdStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStoreByIdStub, 'deleteById')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteStoreById throws', async () => {
    const { sut, deleteStoreByIdStub } = makeSut()
    jest.spyOn(deleteStoreByIdStub, 'deleteById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
