
import { Request, Response } from 'express'
import { IUser } from './types'
import { validateUser } from '../utilities/validation/user-validator'
import { createSignature } from '../utilities/jwt'
import User from './users-model'
import { checkObjectNullity } from '../utilities/checkNullity'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = validateUser({ ...req.body, rol: 'common' })

    let user: IUser | null = await User.create(data)
    user = checkObjectNullity<IUser>(user)

    if (user !== null) {
      const token = createSignature({ _id: user._id })
      res.cookie('auth-jwt', token)
      res.status(200).json({ username: user.username, rol: user.rol, token })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = validateUser({ ...req.body })

    let approvedUser: IUser | null = await User.login(data)
    approvedUser = checkObjectNullity<IUser>(approvedUser)

    if (approvedUser !== null) {
      const token = createSignature({ _id: approvedUser._id })
      res.cookie('auth-jwt', token)
      res.status(200).json({ username: approvedUser.username, rol: approvedUser.rol, token })
    } else throw new Error('Provided password is wrong')
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}
