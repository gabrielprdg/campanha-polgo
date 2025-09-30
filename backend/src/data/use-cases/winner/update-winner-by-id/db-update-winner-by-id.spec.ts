import { UpdateWinnerByIdRepository } from '../../../protocols/db/update-winner-by-id-repository'
import { mockUpdateWinnerByIdRepository } from '../../../test/mock-db-winner'
import { throwError } from '../../../test/test-helper'
import { DbUpdateWinnerById } from './db-update-winner-by-id'

type SutTypes = {
  sut: DbUpdateWinnerById
  updateWinnerByIdRepositoryStub: UpdateWinnerByIdRepository
}

const makeSut = (): SutTypes => {
  const updateWinnerByIdRepositoryStub = mockUpdateWinnerByIdRepository()
  const sut = new DbUpdateWinnerById(updateWinnerByIdRepositoryStub)

  return {
    sut,
    updateWinnerByIdRepositoryStub
  }
}

describe('DbUpdateWinnerById Usecase', () => {
  it('Should call UpdateWinnerByIdRepository with correct values', async () => {
    const { sut, updateWinnerByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateWinnerByIdRepositoryStub, 'update')
    const updateData = { name: 'Updated Name' }
    await sut.update('any_id', updateData)
    expect(updateSpy).toHaveBeenCalledWith('any_id', updateData)
  })

  it('Should throw if UpdateWinnerByIdRepository throws', async () => {
    const { sut, updateWinnerByIdRepositoryStub } = makeSut()
    jest.spyOn(updateWinnerByIdRepositoryStub, 'update').mockImplementationOnce(throwError)

    const promise = sut.update('any_id', {})
    await expect(promise).rejects.toThrow()
  })
})