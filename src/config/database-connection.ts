import { connect, connection } from 'mongoose'
import config from '.'

void (async () => {
  try {
    await connect(config.mongoDb.mongoUri)
    if (config.node_env === 'development') console.log(`Connection on: ${connection.name} effected succesfully`)
  } catch (err) {
    if (config.node_env === 'development') console.log(err)
  }
})()
