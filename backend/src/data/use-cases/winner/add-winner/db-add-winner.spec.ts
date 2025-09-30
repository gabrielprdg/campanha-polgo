import { AddWinnerRepository } from '../../../protocols/db/add-winner-repository'
import { mockAddWinnerRepository } from '../../../test/mock-db-winner'
import { throwError } from '../../../test/test-helper'
import { mockAddWinnerParams, mockWinnerModel } from '../../../../domain/test/mock-winner'
import { DbAddWinner } from './db-add-winner'

type SutTypes = {
  sut: DbAddWinner
  addWinnerRepositoryStub: AddWinnerRepository
}

const makeSut = (): SutTypes => {
  const addWinnerRepositoryStub = mockAddWinnerRepository()
  const sut = new DbAddWinner(addWinnerRepositoryStub)

  return {
    sut,
    addWinnerRepositoryStub
  }
}

describe('DbAddWinner Usecase', () => {
  it('Should call AddWinnerRepository with correct values', async () => {
    const { sut, addWinnerRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addWinnerRepositoryStub, 'add')
    await sut.add(mockAddWinnerParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddWinnerParams())
  })

  it('Should return a Winner on success', async () => {
    const { sut } = makeSut()
    const winner = await sut.add(mockAddWinnerParams())
    expect(winner).toEqual(mockWinnerModel())
  })

  it('Should throw if AddWinnerRepository throws', async () => {
    const { sut, addWinnerRepositoryStub } = makeSut()
    jest.spyOn(addWinnerRepositoryStub, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddWinnerParams())
    await expect(promise).rejects.toThrow()
  })
})