import { Schema, model } from 'mongoose'
import { StaticUserModel, UserModel } from './types/model'
import { IUser } from './types'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  }
}, { versionKey: false })

UserSchema.pre('save', async function () {
  const { genSalt, hash } = await import('bcrypt')
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.statics.login = async function ({ username, password }: IUser): Promise<IUser | null> {
  const { compare } = await import('bcrypt')
  const existingUser: IUser | null = await this.findOne({ username })
  if (existingUser !== null) {
    const { password: hashedPwd } = existingUser
    return await compare(password, hashedPwd) ? existingUser : null
  }

  throw new Error('Not found user')
}

export default model<UserModel, StaticUserModel>('user', UserSchema)
