import { sign, verify, JwtPayload } from 'jsonwebtoken'
import config from '../config'

export const createSignature = (payload: object): string => {
  return sign(payload, config.jwt.secret, { expiresIn: '12h' })
}

export const decryptToken = (token: string): JwtPayload => {
  return verify(token, config.jwt.secret) as JwtPayload
}
