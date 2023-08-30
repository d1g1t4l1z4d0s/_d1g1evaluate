import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import config from './config'
import usersRouter from './users'
import leaguesRouter from './leagues'
import { authenticate } from './middlewares/authenticate'
const app = express()
app.set('port', config.port)
if (config.node_env === 'development') app.use(logger('dev'))
app.use(cors({
  origin: ['https://d1g1t4l1z4d0s.github.io']
}))
app.use(express.json())
app.use('/api/leagues', authenticate, leaguesRouter)
app.use('/users', usersRouter)
export default app
