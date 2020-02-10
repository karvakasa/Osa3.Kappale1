const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
const Person = require('./models/person')


morgan.token('body', function (req, res ) { return JSON.stringify(req.body) })

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  });
})

app.get('/api/info', (req, res) => {
  res.send('Phonebook has info for ' + persons.length + ' people <div></div>' + Date() )
})
app.get('/api/persons/:id', (req, res) => {
  Person.findById(res.params.id).then(person => {
    res.json(person.toJSON())
  })
})
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!body.number) {
    return resp.status(400).json({ 
      error: 'number missing' 
    })
  }
  const lista = persons.map(person => person.name)
  if (lista.includes(body.name)){
    return res.status(400).json({error: 'name must be uniikki'})
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  // persons = persons.concat(person)
  // res.json(person)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})