export interface IUser {
  _id: string
  username: string
  password: string
  rol: 'common' | 'super'
}
