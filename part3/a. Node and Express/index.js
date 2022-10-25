console.log('Package JSON Starting Point')

const { response } = require('express')
const express = require('express')
const app = express()


let notes = [
    {
        "id": 1,
        "content": 'Hola',
        "date": 001,
        "important": false
    },
    {
        "id": 2,
        "content": 'como',
        "date": 002,
        "important": false
    },
    {
        "id": 3,
        "content": 'estas',
        "date": 003,
        "important": false
    },
    {
        "id": 4,
        "content": '?',
        "date": 004,
        "important": false
    }
]

// const http = require('http')
// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    // Express es ASYNC
    console.log(`Server up and running on port ${PORT}`)
})
