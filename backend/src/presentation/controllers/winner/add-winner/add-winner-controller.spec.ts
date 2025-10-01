import { AddWinner } from '../../../../domain/use-cases/winner/add-winner'
import { throwError } from '../../../../data/test/test-helper'
import { mockWinnerModel } from '../../../../domain/test/mock-winner'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { mockAddWinner, mockValidation } from '../../../test'
import { HttpRequest, Validation } from '../../../protocols'
import { AddWinnerController } from './add-winner-controller'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Any Winner',
    state: 'SP',
    city: 'São Paulo',
    prize: 'R$ 1000',
    date: new Date()
  }
})

type SutTypes = {
  sut: AddWinnerController
  validationStub: Validation
  addWinnerStub: AddWinner
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addWinnerStub = mockAddWinner()
  const sut = new AddWinnerController(validationStub, addWinnerStub)

  return {
    sut,
    validationStub,
    addWinnerStub
  }
}

describe('AddWinner Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })

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

  test('Should call AddWinner with correct values', async () => {
    const { sut, addWinnerStub } = makeSut()
    const addSpy = jest.spyOn(addWinnerStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      state: httpRequest.body.state,
      city: httpRequest.body.city,
      prize: httpRequest.body.prize,
      date: new Date(httpRequest.body.date)
    })
  })

  test('Should return 500 if AddWinner throws', async () => {
    const { sut, addWinnerStub } = makeSut()
    jest.spyOn(addWinnerStub, 'add').mockImplementationOnce(throwError)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(mockWinnerModel()))
  })
})
