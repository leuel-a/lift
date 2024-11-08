import jwt, { SignOptions } from 'jsonwebtoken'
import env from './env'

export function signJwt(payload: any, type: 'accessToken' | 'refreshToken') {
  const ttl = type === 'accessToken' ? env.ACCESS_TOKEN_TTL : env.REFRESH_TOKEN_TTL
  const options: SignOptions = {
    expiresIn: ttl,
  }

  return jwt.sign(payload, env.JWT_SECRET, options)
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}
