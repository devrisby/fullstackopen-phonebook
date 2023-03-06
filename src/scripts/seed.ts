import * as config from '../config'
import { startMongo, stopMongo } from '../data/mongo'
import PersonModel from '../modules/person/personSchema'

const persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123456',
  },
  {
    name: 'Ada Lovelace',
    phone: '39-44-5323523',
  },
  {
    name: 'Dan Abramov',
    phone: '12-43-234345',
  },
  {
    name: 'Mary Poppendieck',
    phone: '39-23-6423122',
  },
  {
    name: 'Bob the Builder',
    phone: '123-123-1234',
  },
  {
    name: 'Sandy Cheeks',
    phone: '111-123-1111',
  },
]

const seed = async () => {
  await startMongo(config.MONGO_URI!)
  await PersonModel.deleteMany({})
  await PersonModel.insertMany(persons)

  if (process.argv[2] != null && process.argv[3] != null) {
    const personDTO = new PersonModel({
      name: process.argv[2],
      phone: process.argv[3],
    })
    await personDTO.save()
  }

  const savedPersons = await PersonModel.find({}).exec()

  console.log('phonebook:\n')
  savedPersons.forEach(p => {
    console.log(p)
  })

  await stopMongo()
}

seed().catch(e => {
  console.log(e)
})
