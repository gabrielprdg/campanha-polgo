import mongoose, { Schema, Document } from 'mongoose'
import { StoreModel } from '../../../domain/models/store'

export interface StoreDocument extends Omit<StoreModel, 'id'>, Document {
  _id: string
}

const storeSchema = new Schema<StoreDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    cnpj: {
      type: String,
      required: true,
      trim: true,
      unique: true
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
    address: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    collection: 'stores'
  }
)

export const StoreMongoModel = mongoose.model<StoreDocument>('Store', storeSchema)
