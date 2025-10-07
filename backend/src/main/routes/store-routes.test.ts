import request from 'supertest'
import app from '../config/app'
import { connectToTestDatabase, disconnectFromTestDatabase, clearTestDatabase } from '../../infra/mongoDB/helper/test-helper'
import { StoreMongoModel } from '../../infra/mongoDB/store/store-schema'
import { makeAccessToken } from './test-helpers/auth-helper'

describe('Store Routes', () => {
  beforeAll(async () => {
    await connectToTestDatabase()
  })

  afterAll(async () => {
    await disconnectFromTestDatabase()
  })

  beforeEach(async () => {
    await clearTestDatabase()
  })

  describe('POST /stores', () => {
    test('Should return 201 on add store', async () => {
      const accessToken = makeAccessToken()

      await request(app)
        .post('/api/v1/stores')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'any_name',
          cnpj: '12.345.678/0001-90',
          state: 'any_state',
          city: 'any_city',
          address: 'any_address'
        })
        .expect(201)
    })
  })

  describe('GET /stores', () => {
    test('Should return 200 on load stores', async () => {
      await StoreMongoModel.create({
        name: 'any_name',
        cnpj: '12.345.678/0001-90',
        state: 'any_state',
        city: 'any_city',
        address: 'any_address'
      })

      await request(app)
        .get('/api/v1/stores')
        .expect(200)
    })
  })

  describe('GET /stores/:id', () => {
    test('Should return 200 on load store by id', async () => {
      const store = await StoreMongoModel.create({
        name: 'any_name',
        cnpj: '12.345.678/0001-90',
        state: 'any_state',
        city: 'any_city',
        address: 'any_address'
      })

      await request(app)
        .get(`/api/v1/stores/${store._id.toString()}`)
        .expect(200)
    })
  })

  describe('PATCH /stores/:id', () => {
    test('Should return 204 on update store by Id', async () => {
      const accessToken = makeAccessToken()

      const store = await StoreMongoModel.create({
        name: 'any_name',
        cnpj: '12.345.678/0001-90',
        state: 'any_state',
        city: 'any_city',
        address: 'any_address'
      })

      await request(app)
        .patch(`/api/v1/stores/${store._id.toString()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'updated_name',
          state: 'updated_state'
        })
        .expect(204)
    })
  })

  describe('DELETE /stores/:id', () => {
    test('Should return 204 on delete store by Id', async () => {
      const accessToken = makeAccessToken()

      const store = await StoreMongoModel.create({
        name: 'any_name',
        cnpj: '12.345.678/0001-90',
        state: 'any_state',
        city: 'any_city',
        address: 'any_address'
      })

      await request(app)
        .delete(`/api/v1/stores/${store._id.toString()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204)
    })
  })
})
