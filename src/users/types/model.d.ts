import { Document, Model } from 'mongoose'
import { IUser } from '.'

export interface UserModel extends IUser, Document {}
export interface StaticUserModel extends Model<UserModel> {
  login: ({ username, password }: IUser) => Promise<IUser | null>
}
