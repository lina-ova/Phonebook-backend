
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())

let persons = [
  {
      id:1,
      name:'Arto Hellas',
      number:'040-123456'
  },
  {
    id:2,
    name:'Ada Lovelace',
    number:'39-44-5323523'
},
{
    id:3,
    name:'Dan Abramov',
    number:'12-43-23456'
},
{
    id:4,
    name:'Mary Poppendick',
    number:'39-23-6423123'
}
]

app.get('/info', (req, res) => {
    const date = new Date().toString()
  res.send(`Phonebook has info for ${persons.length} people <br />${date}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const find = persons.find(person => person.name === body.name)
    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return response.status(400).json({
            error:'number is missing'
        })
    }
    if(find){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.random()*10000000000000000000000000000000000000000000000
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})