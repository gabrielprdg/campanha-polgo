import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

// Secret for generating the token (should match JWT_SECRET in .env)
const secret = process.env['JWT_SECRET'] || 'fallback-secret-key'

const jwtAdapter = new JwtAdapter(secret)

// Generate admin token without expiration
const adminToken = jwtAdapter.generateToken({
  role: 'admin',
  name: 'Admin User',
  createdAt: new Date().toISOString()
})

console.log('\n🔑 Admin Token Generated Successfully!\n')
console.log('Add this to your .env files:\n')
console.log(`ADMIN_TOKEN=${adminToken}\n`)
console.log('Frontend (.env):')
console.log(`VITE_ADMIN_TOKEN=${adminToken}\n`)
