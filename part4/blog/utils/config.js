require('dotenv').config()

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } =  process.env
const PORT = process.env.PORT  // || 3003

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_URI_TEST,
  NODE_ENV
}