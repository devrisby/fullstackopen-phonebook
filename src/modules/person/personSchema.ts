import { modelFactory } from '../../data/utils'

const personSchema = {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}

const PersonModel = modelFactory('Person', personSchema)

export default PersonModel
