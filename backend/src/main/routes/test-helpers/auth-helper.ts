import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import env from '@/main/config/environment'

const jwtAdapter = new JwtAdapter(env.jwtSecret)

export const makeAccessToken = (): string => {
  const accessToken = jwtAdapter.generateToken({
    role: 'admin',
    name: 'Test Admin',
    createdAt: new Date().toISOString()
  })

  return accessToken
}
