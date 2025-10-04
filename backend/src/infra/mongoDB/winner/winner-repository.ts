import { AddWinnerRepository } from '../../../data/protocols/db/add-winner-repository'
import { LoadWinnersRepository, PaginationParams, PaginatedWinnersResult } from '../../../data/protocols/db/load-winners-repository'
import { LoadWinnerByIdRepository } from '../../../data/protocols/db/load-winner-by-id-repository'
import { UpdateWinnerByIdRepository } from '../../../data/protocols/db/update-winner-by-id-repository'
import { DeleteWinnerByIdRepository } from '../../../data/protocols/db/delete-winner-by-id-repository'
import { LoadWinnersAggregationRepository, WinnerAggregationByState } from '../../../data/protocols/db/load-winners-aggregation-repository'
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
    DeleteWinnerByIdRepository,
    LoadWinnersAggregationRepository
{
  private mapToModel(winnerDoc: WinnerDocument): WinnerModel {
    const model: WinnerModel = {
      id: winnerDoc._id.toString(),
      name: winnerDoc.name,
      state: winnerDoc.state,
      city: winnerDoc.city,
      prize: winnerDoc.prize,
      date: winnerDoc.date
    }

    if (winnerDoc.created_at) {
      model.created_at = winnerDoc.created_at
    }

    if (winnerDoc.updated_at) {
      model.updated_at = winnerDoc.updated_at
    }

    return model
  }

  async add(winnerData: AddWinnerParams): Promise<WinnerModel> {
    const winner = await WinnerMongoModel.create(winnerData)
    return this.mapToModel(winner)
  }

  async loadAll(): Promise<WinnerModel[]> {
    const winners = await WinnerMongoModel.find().sort({ created_at: -1 })
    return winners.map(winner => this.mapToModel(winner))
  }

  async loadPaginated(params: PaginationParams): Promise<PaginatedWinnersResult> {
    const { page = 1, limit = 10, state } = params
    const skip = (page - 1) * limit

    // Build filter
    const filter: any = {}
    if (state) {
      filter.state = state
    }

    // Execute query with pagination
    const [winners, total] = await Promise.all([
      WinnerMongoModel.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit),
      WinnerMongoModel.countDocuments(filter)
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      winners: winners.map(winner => this.mapToModel(winner)),
      total,
      page,
      limit,
      totalPages
    }
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

  async loadAggregationByState(): Promise<WinnerAggregationByState[]> {
    const aggregation = await WinnerMongoModel.aggregate([
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          state: '$_id',
          count: 1
        }
      },
      {
        $sort: { state: 1 }
      }
    ])
    return aggregation
  }
}