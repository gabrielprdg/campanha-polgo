import { LoadWinnerByIdRepository } from '../../../protocols/db/load-winner-by-id-repository'
import { WinnerModel } from '../../../../domain/models/winner'
import { LoadWinnerById } from '../../../../domain/use-cases/winner/load-winner-by-id'

export class DbLoadWinnerById implements LoadWinnerById {
  private readonly loadWinnerByIdRepository: LoadWinnerByIdRepository

  constructor (loadWinnerByIdRepository: LoadWinnerByIdRepository) {
    this.loadWinnerByIdRepository = loadWinnerByIdRepository
  }

  async loadById (id: string): Promise<WinnerModel | null> {
    const winner = await this.loadWinnerByIdRepository.loadById(id)
    return winner
  }
}