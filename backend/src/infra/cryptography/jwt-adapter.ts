import jwt from 'jsonwebtoken'

export class JwtAdapter {
  constructor(private readonly secret: string) {}

  /**
   * Generates a JWT token without expiration
   * @param payload - Data to be encoded in the token
   * @returns JWT token string
   */
  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret)
  }

  /**
   * Verifies a JWT token
   * @param token - JWT token to verify
   * @returns Decoded payload or null if invalid
   */
  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret)
    } catch (error) {
      return null
    }
  }

  /**
   * Decodes a JWT token without verifying
   * @param token - JWT token to decode
   * @returns Decoded payload or null if invalid
   */
  decode(token: string): any {
    try {
      return jwt.decode(token)
    } catch (error) {
      return null
    }
  }
}
