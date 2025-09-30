import { AddWinnerRepository } from '../../../data/protocols/db/add-winner-repository'
import { LoadWinnersRepository } from '../../../data/protocols/db/load-winners-repository'
import { LoadWinnerByIdRepository } from '../../../data/protocols/db/load-winner-by-id-repository'
import { UpdateWinnerByIdRepository } from '../../../data/protocols/db/update-winner-by-id-repository'
import { DeleteWinnerByIdRepository } from '../../../data/protocols/db/delete-winner-by-id-repository'
import { WinnerModel } from '../../../domain/models/winner'
import { AddWinnerParams } from '../../../domain/use-cases/winner/add-winner'
import { UpdateWinnerParams } from '../../../domain/use-cases/winner/update-winner-by-id'
import { WinnerMongoModel, WinnerDocument } from './winner-schema'

export class WinnerMongoRepository
  implements
    AddWinnerRepository,
    LoadWinnersRepository,
    LoadWinnerByIdRepository,
    UpdateWinnerByIdRepository,
    DeleteWinnerByIdRepository
{
  private mapToModel(winnerDoc: WinnerDocument): WinnerModel {
    return {
      id: winnerDoc._id.toString(),
      name: winnerDoc.name,
      state: winnerDoc.state,
      city: winnerDoc.city,
      prize: winnerDoc.prize,
      date: winnerDoc.date,
      created_at: winnerDoc.created_at,
      updated_at: winnerDoc.updated_at
    }
  }

  async add(winnerData: AddWinnerParams): Promise<WinnerModel> {
    const winner = await WinnerMongoModel.create(winnerData)
    return this.mapToModel(winner)
  }

  async loadAll(): Promise<WinnerModel[]> {
    const winners = await WinnerMongoModel.find().sort({ created_at: -1 })
    return winners.map(winner => this.mapToModel(winner))
  }

  async loadById(id: string): Promise<WinnerModel | null> {
    const winner = await WinnerMongoModel.findById(id)
    return winner ? this.mapToModel(winner) : null
  }

  async update(id: string, winnerData: UpdateWinnerParams): Promise<void> {
    await WinnerMongoModel.findByIdAndUpdate(id, winnerData, { new: true })
  }

  async deleteById(id: string): Promise<void> {
    await WinnerMongoModel.findByIdAndDelete(id)
  }
}