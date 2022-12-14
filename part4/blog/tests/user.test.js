const mongoose = require('mongoose')
const server = require('../index').server
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, usersInDb } = require('./helpers')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash
    })

    await user.save()
  })
  test('Successfully created', async () => {
    // const usersAtStart = await usersInDb()  // helpers
    // const { body: usersAtStart } = await api.get('/api/users')
    const usersAtStart = await User.find({})

    // console.log(usersAtStart)

    const newUser = new User({ 
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      passwordHash: 'salainen'
    })

    
    const savedNewUser = await newUser.save()
    // const userCreated = await api
    //   .post('api/users')
    //   .send(newUser)
    //   .expect(204)
    //   .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await User.find({})
    // console.log(usersAtEnd)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 50000)
})


afterAll(() => {
  mongoose.connection.close()
  server.close()
})