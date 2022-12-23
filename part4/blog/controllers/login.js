const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }
  else {
    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    return response
      .status(200)
      .send({
        token,
        name: user.name,
        unsername: user.username
      })
  }
})

module.exports = loginRouter