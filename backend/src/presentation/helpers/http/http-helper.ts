import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../protocols/http'

export const serverError = (error: Error): HttpResponse => ({
  body: { error: new ServerError(error.stack).message },
  statusCode: 500
})

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})

export const created = (data: any): HttpResponse => ({
  body: data,
  statusCode: 201
})

export const noContent = (): HttpResponse => ({
  body: null,
  statusCode: 204
})

export const badRequest = (error: Error): HttpResponse => ({
  body: { error: error.message },
  statusCode: 400
})

export const notFound = (error: Error): HttpResponse => ({
  body: { error: error.message },
  statusCode: 404
})