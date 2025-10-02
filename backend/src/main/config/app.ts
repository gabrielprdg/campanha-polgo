import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'

const app = express()

// Security middleware
app.use(helmet())
app.use(cors())

// Logging
app.use(morgan('dev'))

// Body parser
app.use(json())
app.use(express.urlencoded({ extended: true }))

// Compression
app.use(compression())

// Swagger documentation
setupSwagger(app)

// Routes
setupRoutes(app)

export default app