import { AddWinnerRepository } from '../../../protocols/db/add-winner-repository'
import { WinnerModel } from '../../../../domain/models/winner'
import { AddWinner, AddWinnerParams } from '../../../../domain/use-cases/winner/add-winner'

export class DbAddWinner implements AddWinner {
  private readonly addWinnerRepository: AddWinnerRepository

  constructor (addWinnerRepository: AddWinnerRepository) {
    this.addWinnerRepository = addWinnerRepository
  }

  async add (winnerData: AddWinnerParams): Promise<WinnerModel> {
    const winner = await this.addWinnerRepository.add(winnerData)
    return winner
  }
}