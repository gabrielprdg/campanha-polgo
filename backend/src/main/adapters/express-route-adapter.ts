import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest: HttpRequest = {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
      }

      console.log('https', httpRequest)

      const httpResponse = await controller.handle(httpRequest)

      console.log('rs', httpResponse)

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.error || httpResponse.body.message || httpResponse.body
        })
      }
    } catch (error) {
      console.error('Error in adaptRoute:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}