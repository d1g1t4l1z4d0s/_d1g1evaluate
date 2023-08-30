import config from './config/index'
import app from './app'
import './config/database-connection'
app
  .listen(app.get('port'), () => {
    if (config.node_env !== 'production') console.log(`Server is initialized and working in port ${app.get('port') as string}`)
  })
