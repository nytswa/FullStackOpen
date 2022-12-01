const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Mongo DB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })


// Disconnecting MongoDB
// process.on('uncaughtException', () => {
//   mongoose.connection.disconnect()
//   .then(() => {
//     console.log('Disconnected from MongoDB')
//   })
// })

// OR on App termination (node)
// process.on('SIGINT', function() {
//   mongoose.connection.close(() => {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });


// module.exports = mongoose