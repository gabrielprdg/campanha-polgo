import { UpdateStoreById } from '../../../../domain/use-cases/store/update-store-by-id'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class UpdateStoreByIdController implements Controller {
  private readonly validation: Validation
  private readonly updateStoreById: UpdateStoreById

  constructor(validation: Validation, updateStoreById: UpdateStoreById) {
    this.validation = validation
    this.updateStoreById = updateStoreById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.params
      const updateData = httpRequest.body

      await this.updateStoreById.update(id, updateData)

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}
