const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "930394024"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(9999999))
}

const findPersonByName = (name) =>
  persons.find(person => person.name.toLowerCase() === name.toLowerCase())

app.get('/info', (req, res) => {
  const persons_count = persons.length
  const persons_formatted = persons.length === 1 ? "person" : "people"

  res.send(
    `<p>Phonebook has info for ${persons_count} ${persons_formatted}</p>` +
    `<p>${new Date()}</p>`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (findPersonByName(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
