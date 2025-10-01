import { DeleteWinnerById } from '../../../../domain/use-cases/winner/delete-winner-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { mockDeleteWinnerById } from '../../../test'
import { HttpRequest } from '../../../protocols'
import { DeleteWinnerByIdController } from './delete-winner-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  params: {
    id: 'any_id'
  },
  query: {}
})

type SutTypes = {
  sut: DeleteWinnerByIdController
  deleteWinnerByIdStub: DeleteWinnerById
}

const makeSut = (): SutTypes => {
  const deleteWinnerByIdStub = mockDeleteWinnerById()
  const sut = new DeleteWinnerByIdController(deleteWinnerByIdStub)

  return {
    sut,
    deleteWinnerByIdStub
  }
}

describe('DeleteWinnerById Controller', () => {
  test('Should call DeleteWinnerById with correct id', async () => {
    const { sut, deleteWinnerByIdStub } = makeSut()
    const deleteByIdSpy = jest.spyOn(deleteWinnerByIdStub, 'deleteById')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(deleteByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteWinnerById throws', async () => {
    const { sut, deleteWinnerByIdStub } = makeSut()
    jest.spyOn(deleteWinnerByIdStub, 'deleteById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
