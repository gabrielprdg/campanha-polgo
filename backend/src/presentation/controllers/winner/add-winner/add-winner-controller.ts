import { AddWinner } from '../../../../domain/use-cases/winner/add-winner'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddWinnerController implements Controller {
  private readonly validation: Validation
  private readonly addWinner: AddWinner

  constructor(validation: Validation, addWinner: AddWinner) {
    this.validation = validation
    this.addWinner = addWinner
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, state, city, prize, date } = httpRequest.body

      const winner = await this.addWinner.add({
        name,
        state,
        city,
        prize,
        date: new Date(date)
      })

      return created(winner)
    } catch (err: any) {
      console.log('err', err)
      return serverError(err)
    }
  }
}