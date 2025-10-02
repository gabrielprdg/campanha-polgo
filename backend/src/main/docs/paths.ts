import { storePath, storeByIdPath } from './paths/store-path'
import { winnerPath, winnerByIdPath } from './paths/winner-path'

export default {
  '/api/v1/stores': storePath,
  '/api/v1/stores/{id}': storeByIdPath,
  '/api/v1/winners': winnerPath,
  '/api/v1/winners/{id}': winnerByIdPath
}
