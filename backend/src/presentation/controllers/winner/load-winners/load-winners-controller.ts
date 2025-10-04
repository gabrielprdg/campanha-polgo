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
      const { page, limit, state } = httpRequest.query || {}

      // If pagination params are provided, use paginated query
      if (page || limit) {
        const pageNum = parseInt(page as string) || 1
        const limitNum = parseInt(limit as string) || 10

        const result = await this.loadWinners.loadPaginated({
          page: pageNum,
          limit: limitNum,
          state: state as string
        })

        return ok(result.winners, 'Ganhadores recuperados com sucesso', {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        })
      }

      // Otherwise, return all winners
      const winners = await this.loadWinners.loadAll()
      return ok(winners)
    } catch (err: any) {
      return serverError(err)
    }
  }
}