import { Request, Response, NextFunction } from 'express'
import { signJwt, verifyJwt } from '../utils/jwt'
import { findUserById } from '../services/users.services'

export default async function revalidateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const accessToken = authHeader.slice(7).trim()

    if (!accessToken) {
      next()
    }

    const decoded = verifyJwt(accessToken)
    if (decoded) {
      return next()
    }

    const refreshToken = req.headers['x-refresh']
    if (!refreshToken || typeof refreshToken !== 'string') {
      return next()
    }

    const refreshDecoded = verifyJwt(refreshToken)
    if (!refreshDecoded) {
      return next()
    }

    const user = await findUserById(refreshDecoded.sub as string)
    if (!user) {
      return next()
    }

    const payload = {
      sub: user._id,
      email: user?.email,
    }

    const newAccessToken = signJwt(payload, 'accessToken')

    // set the new access token
    req.headers['authorization'] = `Bearer ${newAccessToken}`

    // send the new access token
    res.setHeader('x-access', newAccessToken)

    return next()
  }
  next()
}
