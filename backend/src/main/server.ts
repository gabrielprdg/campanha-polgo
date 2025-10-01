import 'module-alias/register'
import 'dotenv/config'
import { mongoHelper } from '../infra/mongoDB/helper/mongoHelper'
import app from './config/app'

mongoHelper.connect()
  .then(() => {
    const port = process.env['PORT'] || 3000
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })