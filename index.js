const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

app.use(morgan('tiny'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
  <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  return Math.floor((Math.random()*100000000000)+1)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "name or number missing" })
  }

  const find = persons.filter(p => p.name === body.name )
  if (find.length >= 1) {
    return res.status(400).json({ error: 'contact already exists' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})