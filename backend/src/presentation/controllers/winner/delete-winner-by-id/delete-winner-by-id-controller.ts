import { DeleteWinnerById } from '../../../../domain/use-cases/winner/delete-winner-by-id'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class DeleteWinnerByIdController implements Controller {
  private readonly deleteWinnerById: DeleteWinnerById

  constructor(deleteWinnerById: DeleteWinnerById) {
    this.deleteWinnerById = deleteWinnerById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      await this.deleteWinnerById.deleteById(id)

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}