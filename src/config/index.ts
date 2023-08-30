import dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({
  path: resolve(__dirname, '../../.env')
})

interface Config {
  node_env: string
  port: string
  mongoDb: {
    mongoUri: string
  }
  jwt: {
    secret: string
  }
}

const mongoDbIn = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI as string : 'mongodb://0.0.0.0:27017/d1g1-evaluate'

const config: Config = {
  node_env: process.env.NODE_ENV as string,
  port: process.env.PORT ?? '3002',
  mongoDb: {
    mongoUri: mongoDbIn
  },
  jwt: {
    secret: process.env.SECRET as string
  }
}

export default config
