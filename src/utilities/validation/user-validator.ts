import Joi from 'joi'
import { IUser } from '../../users/types'

const patterns = {
  password: /^((\w+[?#&$!+|-]+)|([?#&$!+|-]+\w+)).+$/
}

const userValidationSchema = Joi.object<IUser>({
  username: Joi.string().required().trim().min(5),
  password: Joi.string().regex(patterns.password).required().min(8),
  rol: Joi.string().valid('common', 'super')
})

export const validateUser = (user: IUser): IUser => {
  const { value, error } = userValidationSchema.validate(user, { abortEarly: false })
  if (typeof error !== 'undefined') throw error
  return value
}
