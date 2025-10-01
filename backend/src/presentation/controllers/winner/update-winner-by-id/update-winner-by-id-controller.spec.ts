import { UpdateWinnerById } from '../../../../domain/use-cases/winner/update-winner-by-id'
import { throwError } from '../../../../data/test/test-helper'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { mockUpdateWinnerById, mockValidation } from '../../../test'
import { HttpRequest, Validation } from '../../../protocols'
import { UpdateWinnerByIdController } from './update-winner-by-id-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Updated Winner',
    state: 'RJ',
    city: 'Rio de Janeiro',
    prize: 'R$ 2000'
  },
  params: {
    id: 'any_id'
  },
  query: {}
})

type SutTypes = {
  sut: UpdateWinnerByIdController
  validationStub: Validation
  updateWinnerByIdStub: UpdateWinnerById
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const updateWinnerByIdStub = mockUpdateWinnerById()
  const sut = new UpdateWinnerByIdController(validationStub, updateWinnerByIdStub)

  return {
    sut,
    validationStub,
    updateWinnerByIdStub
  }
}

describe('UpdateWinnerById Controller', () => {
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

  test('Should call UpdateWinnerById with correct values', async () => {
    const { sut, updateWinnerByIdStub } = makeSut()
    const updateSpy = jest.spyOn(updateWinnerByIdStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith('any_id', httpRequest.body)
  })

  test('Should convert date string to Date object if provided', async () => {
    const { sut, updateWinnerByIdStub } = makeSut()
    const updateSpy = jest.spyOn(updateWinnerByIdStub, 'update')
    const httpRequest = {
      body: {
        date: '2024-01-01'
      },
      params: {
        id: 'any_id'
      },
      query: {}
    }
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith('any_id', {
      date: new Date('2024-01-01')
    })
  })

  test('Should return 500 if UpdateWinnerById throws', async () => {
    const { sut, updateWinnerByIdStub } = makeSut()
    jest.spyOn(updateWinnerByIdStub, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
