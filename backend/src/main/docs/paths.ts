import { storePath, storeByIdPath } from './paths/store-path'
import { winnerPath, winnerByIdPath, winnerAggregationPath } from './paths/winner-path'

export default {
  '/api/v1/stores': storePath,
  '/api/v1/stores/{id}': storeByIdPath,
  '/api/v1/winners': winnerPath,
  '/api/v1/winners/aggregation': winnerAggregationPath,
  '/api/v1/winners/{id}': winnerByIdPath
}
