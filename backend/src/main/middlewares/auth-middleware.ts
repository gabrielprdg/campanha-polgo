import { Request, Response, NextFunction } from 'express'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import env from '@/main/config/environment'

const jwtAdapter = new JwtAdapter(env.jwtSecret)

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  console.log('🔐 Auth Middleware - Authorization Header:', authHeader)
  console.log('🔑 Auth Middleware - JWT Secret:', env.jwtSecret)

  if (!authHeader) {
    console.log('❌ Auth Error: No token provided')
    res.status(401).json({ error: 'No token provided' })
    return
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    console.log('❌ Auth Error: Token error - parts length:', parts.length)
    res.status(401).json({ error: 'Token error' })
    return
  }

  const [scheme, token] = parts

  console.log('🔍 Auth - Scheme:', scheme)
  console.log('🔍 Auth - Token:', token)

  if (!/^Bearer$/i.test(scheme)) {
    console.log('❌ Auth Error: Token malformatted - scheme is:', scheme)
    res.status(401).json({ error: 'Token malformatted' })
    return
  }

  const decoded = jwtAdapter.verify(token)

  console.log('🔓 Auth - Decoded:', decoded)

  if (!decoded) {
    console.log('❌ Auth Error: Token invalid')
    res.status(401).json({ error: 'Token invalid' })
    return
  }

  // Add user info to request
  req.user = decoded

  console.log('✅ Auth Success - User:', decoded)
  next()
}
