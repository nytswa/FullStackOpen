const jwt = require('jsonwebtoken')

// Get User From
module.exports = (request, response, next) => {
  let decodedToken = {}
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = decodedToken
  } catch {}
  next()
}