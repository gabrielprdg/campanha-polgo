import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api/v1', router)

  readdirSync(path.join(__dirname, '/../routes')).forEach(file => {
    if (
      !file.includes('.test.') &&
      !file.endsWith('.map') &&
      !file.endsWith('.d.ts') &&
      (file.endsWith('.js') || file.endsWith('.ts'))
    ) {
      require(`../routes/${file}`).default(router)
    }
  })
}