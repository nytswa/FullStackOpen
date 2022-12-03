const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server_app = http.createServer(app)

const server = server_app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = {
  server,
  server_app
}