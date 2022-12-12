const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(204).json(savedUser)
})

module.exports = usersRouter