const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const connectionString = config.NODE_ENV === 'test' 
  ? config.MONGODB_URI_TEST 
  : config.MONGODB_URI

mongoose.connect(connectionString)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })