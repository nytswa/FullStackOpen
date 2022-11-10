require('dotenv').config()

// Solo se requiere 1 sola ejecución para la conección al servidor.
require('./mongo')

const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')  // after database connection



const app = express()

// Accept requests from anywhere
app.use(cors())
// json-parser to get easy access to request.body
app.use(express.json())

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


let persons = []

// app.use()

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend Home Page</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date() 
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `)
})

// Get all using mongo/mongoose
app.get('/api/persons', (req, res) => {
    Person.find({}).then(contacts => {
        res.json(contacts)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(err => next(err))
        // sending to last USE: middleware to catch not Founds and 40- errors
})

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    Person.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    }).catch(err => next(err))

})

app.post('/api/persons', (req, res) => {
    const person = req.body

    // No input Control
    if (!person) {
        res.status(400).json({
            error: 'Unexpected error: No person data'
        })
    }
    if (!person.name || !person.number) {
        res.status(400).json({
            error: 'Name or Number is missing'
        })
    }

    // Already exists (update this with mongo database find)
    // const doesNotExist = persons.findIndex(p => p.name === person.name)
    // Trying find wiht mongo
    else {
        Person.exists({ name: person.name }).then(contactFind => {
            if (contactFind !== null) {
                console.log('Person already Exists', contactFind)
                res.status(400).json({
                    error: 'Name must be unique'
                })
            }
        })

        // Add
        // Create ID: Not anymore since MongoDB creates its own IDs

        // Create new Person/Contact
        const contact = new Person({
            name: person.name,
            number: person.number
        })

        // Save Person/Contact
        contact.save().then(savedContact => {
            res.status(201).json(savedContact)
        })
    }
})


// 404 NOT FOUND catch-path
app.use((error, request, response) => {
    // console path
    console.log(request.path)
    
    console.error(error)
    // console.log(error.name, error.message)
    if (error.name === "CastError") {
        response.status(400).end()
    }

    // response.status(500).send({ error: 'id used is malformed' })
    response.status(404).json({
        error: "Not found"
    })
})


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
