import { DeleteWinnerByIdRepository } from '../../../protocols/db/delete-winner-by-id-repository'
import { DeleteWinnerById } from '../../../../domain/use-cases/winner/delete-winner-by-id'

export class DbDeleteWinnerById implements DeleteWinnerById {
  private readonly deleteWinnerByIdRepository: DeleteWinnerByIdRepository

  constructor (deleteWinnerByIdRepository: DeleteWinnerByIdRepository) {
    this.deleteWinnerByIdRepository = deleteWinnerByIdRepository
  }

  async deleteById (id: string): Promise<void> {
    await this.deleteWinnerByIdRepository.deleteById(id)
  }
}