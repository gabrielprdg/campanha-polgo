import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddStoreController } from '../factories/controllers/store/add-store/add-store-controller-factory'
import { makeLoadStoresController } from '../factories/controllers/store/load-stores/load-stores-controller-factory'
import { makeLoadStoreByIdController } from '../factories/controllers/store/load-store-by-id/load-store-by-id-controller-factory'
import { makeUpdateStoreByIdController } from '../factories/controllers/store/update-store-by-id/update-store-by-id-controller-factory'
import { makeDeleteStoreByIdController } from '../factories/controllers/store/delete-store-by-id/delete-store-by-id-controller-factory'
import { authMiddleware } from '../middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/stores', authMiddleware, adaptRoute(makeAddStoreController()))
  router.get('/stores', adaptRoute(makeLoadStoresController()))
  router.get('/stores/:id', adaptRoute(makeLoadStoreByIdController()))
  router.patch('/stores/:id', authMiddleware, adaptRoute(makeUpdateStoreByIdController()))
  router.delete('/stores/:id', authMiddleware, adaptRoute(makeDeleteStoreByIdController()))
}
