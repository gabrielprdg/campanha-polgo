import { UpdateWinnerByIdRepository } from '../../../protocols/db/update-winner-by-id-repository'
import { UpdateWinnerById, UpdateWinnerParams } from '../../../../domain/use-cases/winner/update-winner-by-id'

export class DbUpdateWinnerById implements UpdateWinnerById {
  private readonly updateWinnerByIdRepository: UpdateWinnerByIdRepository

  constructor (updateWinnerByIdRepository: UpdateWinnerByIdRepository) {
    this.updateWinnerByIdRepository = updateWinnerByIdRepository
  }

  async update (id: string, winnerData: UpdateWinnerParams): Promise<void> {
    await this.updateWinnerByIdRepository.update(id, winnerData)
  }
}