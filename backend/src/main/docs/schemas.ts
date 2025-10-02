import { errorSchema } from './schemas/error-schema'
import { storeSchema } from './schemas/store-schema'
import { addStoreParamsSchema } from './schemas/add-store-params-schema'
import { winnerSchema } from './schemas/winner-schema'
import { addWinnerParamsSchema } from './schemas/add-winner-params-schema'

export default {
  error: errorSchema,
  store: storeSchema,
  addStoreParams: addStoreParamsSchema,
  winner: winnerSchema,
  addWinnerParams: addWinnerParamsSchema
}
