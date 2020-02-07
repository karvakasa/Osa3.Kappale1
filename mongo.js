const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://topias_uotila:${password}@cluster0-tqhkc.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
    persons = Person.find({})
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

if (process.argv.length>3){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: generateId(),
      })
      
      person.save().then(response => {
        console.log('added ', process.argv[3], ' number ', process.argv[4], ' to phonebook');
        mongoose.connection.close();
      })
}

if (process.argv.length<4){
Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })}