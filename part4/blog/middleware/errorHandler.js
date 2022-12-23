const { restart } = require("nodemon")

const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed'}),

  ValidationError: (res, {message}) =>  res.status(400).json({ error: message }),

  JsonWebTokenError: res => res.status(401).json({ error: 'invalid token' }),

  TokenExpirerError: res => res.status(401).json({ error: 'token expired' }),

  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response) => {
  // console path

  console.log('---TESTING: error middleware')
  // console.log(request.path)  // undefined
  console.log(error.name, error.message)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)

  next()
}