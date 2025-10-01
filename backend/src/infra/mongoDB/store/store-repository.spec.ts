import { mockAddStoreParams } from '../../../domain/test/mock-store'
import { mongoHelper } from '../helper/mongoHelper'
import { StoreMongoRepository } from './store-repository'
import { StoreMongoModel } from './store-schema'

const makeSut = (): StoreMongoRepository => {
  return new StoreMongoRepository()
}

describe('Store Mongo Repository', () => {
  beforeAll(async () => {
    await mongoHelper.connect()
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    await StoreMongoModel.deleteMany({})
  })

  describe('add()', () => {
    test('Should return a store on add success', async () => {
      const sut = makeSut()
      const store = await sut.add(mockAddStoreParams())

      expect(store).toBeTruthy()
      expect(store.id).toBeTruthy()
      expect(store.name).toBe('Any Store')
      expect(store.cnpj).toBe('12.345.678/0001-90')
      expect(store.state).toBe('SP')
      expect(store.city).toBe('São Paulo')
      expect(store.address).toBe('Rua Exemplo, 123')
      expect(store.created_at).toBeTruthy()
      expect(store.updated_at).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should return all stores on success', async () => {
      const sut = makeSut()
      await StoreMongoModel.create(mockAddStoreParams())
      await StoreMongoModel.create({
        ...mockAddStoreParams(),
        name: 'Another Store',
        cnpj: '98.765.432/0001-10'
      })

      const stores = await sut.loadAll()

      expect(stores).toBeTruthy()
      expect(stores.length).toBe(2)
      expect(stores[0].id).toBeTruthy()
      expect(stores[1].id).toBeTruthy()
    })

    test('Should return empty array if no stores exist', async () => {
      const sut = makeSut()
      const stores = await sut.loadAll()

      expect(stores).toEqual([])
    })
  })

  describe('loadById()', () => {
    test('Should return a store on success', async () => {
      const sut = makeSut()
      const createdStore = await StoreMongoModel.create(mockAddStoreParams())

      const store = await sut.loadById(createdStore._id.toString())

      expect(store).toBeTruthy()
      expect(store?.id).toBe(createdStore._id.toString())
      expect(store?.name).toBe('Any Store')
      expect(store?.cnpj).toBe('12.345.678/0001-90')
      expect(store?.state).toBe('SP')
      expect(store?.city).toBe('São Paulo')
      expect(store?.address).toBe('Rua Exemplo, 123')
    })

    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const store = await sut.loadById('507f1f77bcf86cd799439011')

      expect(store).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update a store on success', async () => {
      const sut = makeSut()
      const createdStore = await StoreMongoModel.create(mockAddStoreParams())

      await sut.update(createdStore._id.toString(), {
        name: 'Updated Store',
        state: 'RJ'
      })

      const updatedStore = await StoreMongoModel.findById(createdStore._id)

      expect(updatedStore).toBeTruthy()
      expect(updatedStore?.name).toBe('Updated Store')
      expect(updatedStore?.state).toBe('RJ')
      expect(updatedStore?.city).toBe('São Paulo')
    })
  })

  describe('deleteById()', () => {
    test('Should delete a store on success', async () => {
      const sut = makeSut()
      const createdStore = await StoreMongoModel.create(mockAddStoreParams())

      await sut.deleteById(createdStore._id.toString())

      const deletedStore = await StoreMongoModel.findById(createdStore._id)

      expect(deletedStore).toBeNull()
    })
  })
})
