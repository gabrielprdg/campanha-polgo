import { DeleteStoreById } from '../../../../domain/use-cases/store/delete-store-by-id'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class DeleteStoreByIdController implements Controller {
  private readonly deleteStoreById: DeleteStoreById

  constructor(deleteStoreById: DeleteStoreById) {
    this.deleteStoreById = deleteStoreById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteStoreById.deleteById(id)
      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
