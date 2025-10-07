import { mockAddWinnerParams } from '../../../domain/test/mock-winner'
import { connectToTestDatabase, disconnectFromTestDatabase, clearTestDatabase } from '../helper/test-helper'
import { WinnerMongoRepository } from './winner-repository'
import { WinnerMongoModel } from './winner-schema'

const makeSut = (): WinnerMongoRepository => {
  return new WinnerMongoRepository()
}

describe('Winner Mongo Repository', () => {
  beforeAll(async () => {
    await connectToTestDatabase()
  })

  afterAll(async () => {
    await disconnectFromTestDatabase()
  })

  beforeEach(async () => {
    await clearTestDatabase()
  })

  describe('add()', () => {
    test('Should return a winner on add success', async () => {
      const sut = makeSut()
      const winner = await sut.add(mockAddWinnerParams())

      expect(winner).toBeTruthy()
      expect(winner.id).toBeTruthy()
      expect(winner.name).toBe('Any Winner')
      expect(winner.state).toBe('SP')
      expect(winner.city).toBe('São Paulo')
      expect(winner.prize).toBe('R$ 1000')
      expect(winner.date).toBeTruthy()
      expect(winner.created_at).toBeTruthy()
      expect(winner.updated_at).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should return all winners on success', async () => {
      const sut = makeSut()
      await WinnerMongoModel.create(mockAddWinnerParams())
      await WinnerMongoModel.create({
        ...mockAddWinnerParams(),
        name: 'Another Winner'
      })

      const winners = await sut.loadAll()

      expect(winners).toBeTruthy()
      expect(winners.length).toBe(2)
      expect(winners[0].id).toBeTruthy()
      expect(winners[1].id).toBeTruthy()
    })

    test('Should return empty array if no winners exist', async () => {
      const sut = makeSut()
      const winners = await sut.loadAll()

      expect(winners).toEqual([])
    })
  })

  describe('loadById()', () => {
    test('Should return a winner on success', async () => {
      const sut = makeSut()
      const createdWinner = await WinnerMongoModel.create(mockAddWinnerParams())

      const winner = await sut.loadById(createdWinner._id.toString())

      expect(winner).toBeTruthy()
      expect(winner?.id).toBe(createdWinner._id.toString())
      expect(winner?.name).toBe('Any Winner')
      expect(winner?.state).toBe('SP')
      expect(winner?.city).toBe('São Paulo')
      expect(winner?.prize).toBe('R$ 1000')
    })

    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const winner = await sut.loadById('507f1f77bcf86cd799439011')

      expect(winner).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update a winner on success', async () => {
      const sut = makeSut()
      const createdWinner = await WinnerMongoModel.create(mockAddWinnerParams())

      await sut.update(createdWinner._id.toString(), {
        name: 'Updated Winner',
        state: 'RJ'
      })

      const updatedWinner = await WinnerMongoModel.findById(createdWinner._id)

      expect(updatedWinner).toBeTruthy()
      expect(updatedWinner?.name).toBe('Updated Winner')
      expect(updatedWinner?.state).toBe('RJ')
      expect(updatedWinner?.city).toBe('São Paulo')
    })
  })

  describe('deleteById()', () => {
    test('Should delete a winner on success', async () => {
      const sut = makeSut()
      const createdWinner = await WinnerMongoModel.create(mockAddWinnerParams())

      await sut.deleteById(createdWinner._id.toString())

      const deletedWinner = await WinnerMongoModel.findById(createdWinner._id)

      expect(deletedWinner).toBeNull()
    })
  })
})
