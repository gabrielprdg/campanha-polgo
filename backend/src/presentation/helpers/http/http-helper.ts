import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../protocols/http'

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export const serverError = (error: Error): HttpResponse => ({
  body: {
    success: false,
    error: new ServerError(error.stack).message,
    message: 'Erro interno do servidor'
  },
  statusCode: 500
})

export const ok = (data: any, message: string = 'Dados recuperados com sucesso', pagination?: PaginationData): HttpResponse => ({
  body: {
    success: true,
    data,
    ...(pagination && { pagination }),
    message
  },
  statusCode: 200
})

export const created = (data: any, message: string = 'Recurso criado com sucesso'): HttpResponse => ({
  body: {
    success: true,
    data,
    message
  },
  statusCode: 201
})

export const noContent = (): HttpResponse => ({
  body: {
    success: true,
    message: 'Operação realizada com sucesso'
  },
  statusCode: 204
})

export const badRequest = (error: Error): HttpResponse => ({
  body: {
    success: false,
    error: error.message,
    message: 'Requisição inválida'
  },
  statusCode: 400
})

export const notFound = (error: Error): HttpResponse => ({
  body: {
    success: false,
    error: error.message,
    message: 'Recurso não encontrado'
  },
  statusCode: 404
})