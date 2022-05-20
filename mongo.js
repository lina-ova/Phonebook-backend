const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://full-stack:${password}@cluster0.pjr2l.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        
        })
        mongoose.connection.close()
      })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({ name, number })

    person.save().then(result => {
        console.log(` added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
}




