import { NextFunction, Request, Response } from 'express'
import { decryptToken } from '../utilities/jwt'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string | null = null
    const authorization = req.headers.authorization
    if (typeof authorization === 'string') token = ridOfBearer(authorization)
    else {
      res.status(400).json({ error: 'No authorization headers' })
      return
    }

    if (token !== null) {
      req.user = decryptToken(token)._id
      return next()
    }

    req.user = undefined
    res.status(400).json({ error: 'Wrong method to send token' })
  } catch (err) {
    const error = err as Error
    if (error?.name === 'JsonWebTokenError') res.status(500).json({ error: 'Token error' })
    else if (error?.name === 'TokenExpiredError') res.status(500).json({ error: 'Token expired' })
  }
}

const ridOfBearer = (authorizationStr: string): string | null => {
  const [bearer, token]: [string, string] = authorizationStr.split(' ') as [string, string]
  if (bearer !== undefined) {
    if (bearer.toLocaleLowerCase() === 'bearer') return token
  }
  return null
}
