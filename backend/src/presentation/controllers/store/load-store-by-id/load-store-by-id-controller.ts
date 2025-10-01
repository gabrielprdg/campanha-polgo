import { LoadStoreById } from '../../../../domain/use-cases/store/load-store-by-id'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStoreByIdController implements Controller {
  private readonly loadStoreById: LoadStoreById

  constructor(loadStoreById: LoadStoreById) {
    this.loadStoreById = loadStoreById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const store = await this.loadStoreById.loadById(id)

      if (!store) {
        return notFound(new Error('Store not found'))
      }

      return ok(store)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
