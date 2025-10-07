import { Request, Response, NextFunction } from 'express'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import env from '@/main/config/environment'

const jwtAdapter = new JwtAdapter(env.jwtSecret)

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' })
    return
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token error' })
    return
  }
  
  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token malformatted' })
    return
  }

  const decoded = jwtAdapter.verify(token)

  if (!decoded) {
    res.status(401).json({ error: 'Token invalid' })
    return
  }

  // Add user info to request
  req.user = decoded

  console.log('✅ Auth Success - User:', decoded)
  next()
}
