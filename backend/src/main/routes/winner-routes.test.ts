import request from 'supertest'
import app from '../config/app'
import { connectToTestDatabase, disconnectFromTestDatabase, clearTestDatabase } from '../../infra/mongoDB/helper/test-helper'
import { WinnerMongoModel } from '../../infra/mongoDB/winner/winner-schema'
import { makeAccessToken } from './test-helpers/auth-helper'

describe('Winner Routes', () => {
  beforeAll(async () => {
    await connectToTestDatabase()
  })

  afterAll(async () => {
    await disconnectFromTestDatabase()
  })

  beforeEach(async () => {
    await clearTestDatabase()
  })

  describe('POST /winners', () => {
    test('Should return 204 on add winner', async () => {
      const accessToken = makeAccessToken()

      await request(app)
        .post('/api/v1/winners')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'any_name',
          state: 'any_state',
          city: 'any_city',
          prize: 'any_prize',
          date: new Date()
        })
        .expect(201)
    })
  })

  describe('GET /winners', () => {
    test('Should return 200 on load winners', async () => {
      await WinnerMongoModel.create({
        name: 'any_name',
        state: 'any_state',
        city: 'any_city',
        prize: 'any_prize',
        date: new Date()
      })

      await request(app)
        .get('/api/v1/winners')
        .expect(200)
    })
  })

  describe('PATCH /winners/:id', () => {
    test('Should return 200 on update winner by Id', async () => {
      const accessToken = makeAccessToken()

      const winner = await WinnerMongoModel.create({
        name: 'any_name',
        state: 'any_state',
        city: 'any_city',
        prize: 'any_prize',
        date: new Date()
      })

      await request(app)
        .patch(`/api/v1/winners/${winner._id.toString()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'updated_name',
          state: 'updated_state'
        })
        .expect(204)
    })
  })

  describe('DELETE /winners/:id', () => {
    test('Should return 204 on delete winner by Id', async () => {
      const accessToken = makeAccessToken()

      const winner = await WinnerMongoModel.create({
        name: 'any_name',
        state: 'any_state',
        city: 'any_city',
        prize: 'any_prize',
        date: new Date()
      })

      await request(app)
        .delete(`/api/v1/winners/${winner._id.toString()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204)
    })
  })
})
