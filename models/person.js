const mongoose = require('mongoose')

const url = 'mongodb://<dbuser>:<dbpassword>@ds125322.mlab.com:25322/puhelinluettelofullstack'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person