import { LoadWinnerById } from '../../../../domain/use-cases/winner/load-winner-by-id'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadWinnerByIdController implements Controller {
  private readonly loadWinnerById: LoadWinnerById

  constructor(loadWinnerById: LoadWinnerById) {
    this.loadWinnerById = loadWinnerById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const winner = await this.loadWinnerById.loadById(id)

      if (!winner) {
        return notFound(new Error('Winner not found'))
      }

      return ok(winner)
    } catch (err: any) {
      return serverError(err)
    }
  }
}