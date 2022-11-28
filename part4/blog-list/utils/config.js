require('dotenv').config()

const MONGODB_URI = 'mongodb://localhost/bloglist' || process.env.MONGODB_URI
const PORT = process.env.PORT || 3003

module.exports = {
  PORT,
  MONGODB_URI
}