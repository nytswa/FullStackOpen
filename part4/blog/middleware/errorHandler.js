const { restart } = require("nodemon")

const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed'}),

  ValidationError: (res, {message}) =>  res.status(400).json({ error: message }),

  JsonWebTokenError: res => res.status(401).json({ error: 'invalid token' }),

  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response) => {
  // console path

  console.log('---TESTING: error middleware')
  console.log(request.path)
  console.error(error)
  console.log(error.name, error.message)

  // Bad Request
  if (error.name === "CastError") {
    return response.status(400).send({ error: 'id used is malformed' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  } else {  // (error.name === "Error")
    response.status(500).send({ error: 'Internal Server Error' })
  }

  next()
}