const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const userFind = await User.exists({ username: username })
  
  // Control/Validation
  if (!username) {
    response.status(400).json({
      error: 'Username is a must'
    })
  } else if (!password) {
    response.status(400).json({
      error: 'No password found'
    })
  } else if (userFind) {
    console.log('Username', username, 'is already taken', )
      response.status(400).json({
        error: 'Username must be unique'
      })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash
    })
  
    const savedUser = await user.save()
  
    response.status(204).json(savedUser)  // or 204
  }
})

module.exports = usersRouter