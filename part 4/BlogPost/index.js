const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')


const server = http.createServer(app)


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})