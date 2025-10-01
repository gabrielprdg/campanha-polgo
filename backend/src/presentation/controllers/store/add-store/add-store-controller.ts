import { AddStore } from '../../../../domain/use-cases/store/add-store'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddStoreController implements Controller {
  private readonly validation: Validation
  private readonly addStore: AddStore

  constructor(validation: Validation, addStore: AddStore) {
    this.validation = validation
    this.addStore = addStore
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, cnpj, state, city, address } = httpRequest.body

      const store = await this.addStore.add({
        name,
        cnpj,
        state,
        city,
        address
      })

      return created(store)
    } catch (err: any) {
      return serverError(err)
    }
  }
}
