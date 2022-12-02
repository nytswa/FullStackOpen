const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')



mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })