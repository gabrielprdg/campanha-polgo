import { LoadStores } from '../../../../domain/use-cases/store/load-stores'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStoresController implements Controller {
  private readonly loadStores: LoadStores

  constructor(loadStores: LoadStores) {
    this.loadStores = loadStores
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stores = await this.loadStores.loadAll()
      return ok(stores)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
