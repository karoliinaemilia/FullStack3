const mongoose = require('mongoose')

const url = 'mongodb://<username>:<password>@ds125322.mlab.com:25322/puhelinluettelofullstack'

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

if (process.argv[2] === undefined) {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
    id: Math.floor(Math.random()*100000000)+1
  })

  person.save().then(result => {
    console.log(`lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
    mongoose.connection.close()
  })
}