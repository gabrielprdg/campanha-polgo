import mongoose, { Schema, Document } from 'mongoose'
import { WinnerModel } from '../../../domain/models/winner'

export interface WinnerDocument extends Omit<WinnerModel, 'id'>, Document {
  _id: string
}

const winnerSchema = new Schema<WinnerDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    prize: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    collection: 'winners'
  }
)

export const WinnerMongoModel = mongoose.model<WinnerDocument>('Winner', winnerSchema)