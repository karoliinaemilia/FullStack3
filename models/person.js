const mongoose = require('mongoose')

const url = 'mongodb://<dbuser>:<dbpassword>@ds125322.mlab.com:25322/puhelinluettelofullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

module.exports = Person