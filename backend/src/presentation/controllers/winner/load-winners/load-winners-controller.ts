import { LoadWinners } from '../../../../domain/use-cases/winner/load-winners'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadWinnersController implements Controller {
  private readonly loadWinners: LoadWinners

  constructor(loadWinners: LoadWinners) {
    this.loadWinners = loadWinners
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const winners = await this.loadWinners.loadAll()
      return ok(winners)
    } catch (err: any) {
      return serverError(err)
    }
  }
}