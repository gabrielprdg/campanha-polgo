import { LoadWinnersAggregation } from '../../../../domain/use-cases/winner/load-winners-aggregation'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpResponse } from '../../../protocols'

export class LoadWinnersAggregationController implements Controller {
  private readonly loadWinnersAggregation: LoadWinnersAggregation

  constructor(loadWinnersAggregation: LoadWinnersAggregation) {
    this.loadWinnersAggregation = loadWinnersAggregation
  }

  async handle(): Promise<HttpResponse> {
    try {
      const aggregation = await this.loadWinnersAggregation.loadByState()
      return ok(aggregation)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
