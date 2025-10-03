import { LoadWinnersAggregationRepository } from '../../../protocols/db/load-winners-aggregation-repository'
import { LoadWinnersAggregation, WinnerAggregationByState } from '../../../../domain/use-cases/winner/load-winners-aggregation'

export class DbLoadWinnersAggregation implements LoadWinnersAggregation {
  private readonly loadWinnersAggregationRepository: LoadWinnersAggregationRepository

  constructor(loadWinnersAggregationRepository: LoadWinnersAggregationRepository) {
    this.loadWinnersAggregationRepository = loadWinnersAggregationRepository
  }

  async loadByState(): Promise<WinnerAggregationByState[]> {
    const aggregation = await this.loadWinnersAggregationRepository.loadAggregationByState()
    return aggregation
  }
}
