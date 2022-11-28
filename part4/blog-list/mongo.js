const mongoose = require('mongoose')
// const Blog = require('./models/Blog')
const config = require('./utils/config')
const logger = require('./utils/logger')

// connection string
const connectionString = process.env.MONGODB_URI


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Mongo DB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })


// Disconnecting MongoDB
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})

// OR on App termination (node)
// process.on('SIGINT', function() {
//   mongoose.connection.close(() => {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });


module.exports = mongoose