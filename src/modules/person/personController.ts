import express from 'express'
import { objectIdValidator } from '../../data/utils'
import PersonModel from './personSchema'
import ApiError from '../../http/error'

const router = express.Router()

const phoneNumberValidator = (phone: string) => {
  if (phone.length < 8) {
    throw new ApiError(400, 'Phone number must be atleast 8 characters long')
  }

  if (phone.match(/^[0-9-]+$/) == null) {
    throw new ApiError(400, "Phone number must only contain digits or '-'")
  }

  if (phone.includes('-')) {
    // https://www.w3docs.com/snippets/javascript/how-to-count-string-occurrence-in-string.html
    if ((phone.match(/-/g) ?? []).length !== 1)
      throw new ApiError(400, "Phone number must have only one '-' character!")

    if (!(phone[2] === '-' || phone[3] === '-'))
      throw new ApiError(
        400,
        "Phone number must have '-' as the 3rd or 4th digit!"
      )
  }
}

router.get('/info', async (req, res) => {
  const persons = await PersonModel.find({}).exec()
  const message = `Phonebook has info for ${
    persons.length
  } people\n ${new Date().toString()}`

  res.status(200).send(message)
})

router.get('/', async (req, res) => {
  const persons = await PersonModel.find({}).exec()

  res.status(200).json(persons)
})

router.post('/', async (req, res) => {
  if (req.body.name == null || req.body.phone == null) {
    throw new ApiError(400, 'Missing name or phone number')
  }

  if (req.body.name.length < 3) {
    throw new ApiError(400, 'Name must be atleast 3 characters long')
  }

  phoneNumberValidator(req.body.phone)

  if ((await PersonModel.findOne({ name: req.body.name })) != null) {
    throw new ApiError(409, 'Already exists in phonebook!')
  }

  const personDTO = new PersonModel({
    name: req.body.name,
    phone: req.body.phone,
  })
  const newPerson = await personDTO.save()

  res.status(201).json(newPerson)
})

router.get('/:id', async (req, res) => {
  if (!objectIdValidator(req.params.id)) {
    throw new ApiError(400, 'Incorrect ID format')
  }

  const person = await PersonModel.findById(req.params.id).exec()

  if (person != null) {
    res.status(200).json(person)
  } else {
    throw new ApiError(404, 'Person not found')
  }
})

router.put('/:id', async (req, res) => {
  if (!objectIdValidator(req.params.id)) {
    throw new ApiError(400, 'Incorrect ID format')
  }

  if (req.body.name < 3) {
    throw new ApiError(400, 'Name must be atleast 3 characters long')
  }

  phoneNumberValidator(req.body.phone)

  const personDTO = {
    name: req.body.name,
    phone: req.body.phone,
  }

  const updatedPerson = await PersonModel.findByIdAndUpdate(
    req.params.id,
    personDTO,
    { new: true }
  )

  if (updatedPerson != null) {
    res.status(200).json(updatedPerson)
  } else {
    throw new ApiError(404, 'Person not found')
  }
})

router.delete('/:id', async (req, res) => {
  if (!objectIdValidator(req.params.id)) {
    throw new ApiError(400, 'Incorrect ID format')
  }

  await PersonModel.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

export default router
