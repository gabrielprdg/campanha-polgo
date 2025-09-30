import { LoadWinnersRepository } from '../../../protocols/db/load-winners-repository'
import { WinnerModel } from '../../../../domain/models/winner'
import { LoadWinners } from '../../../../domain/use-cases/winner/load-winners'

export class DbLoadWinners implements LoadWinners {
  private readonly loadWinnersRepository: LoadWinnersRepository

  constructor (loadWinnersRepository: LoadWinnersRepository) {
    this.loadWinnersRepository = loadWinnersRepository
  }

  async loadAll (): Promise<WinnerModel[]> {
    const winners = await this.loadWinnersRepository.loadAll()
    return winners
  }
}