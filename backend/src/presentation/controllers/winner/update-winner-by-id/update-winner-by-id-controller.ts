import { UpdateWinnerById } from '../../../../domain/use-cases/winner/update-winner-by-id'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class UpdateWinnerByIdController implements Controller {
  private readonly validation: Validation
  private readonly updateWinnerById: UpdateWinnerById

  constructor(validation: Validation, updateWinnerById: UpdateWinnerById) {
    this.validation = validation
    this.updateWinnerById = updateWinnerById
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.params
      const updateData = httpRequest.body

      if (updateData.date) {
        updateData.date = new Date(updateData.date)
      }

      await this.updateWinnerById.update(id, updateData)

      return noContent()
    } catch (err: any) {
      return serverError(err)
    }
  }
}