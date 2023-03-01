import mongoose from 'mongoose'

const startMongo = async (uri: string) => await mongoose.connect(uri)
const stopMongo = async () => {
  await mongoose.connection.close()
}
const mongoHealth = async () => await mongoose.connection.db.stats()

const modelFactory = (name: string, paths: any) => {
  const transformer = {
    transform: (
      _doc: mongoose.Document,
      result: { id: any; _id: any; __v: any }
    ) => {
      result.id = result._id.toString()
      delete result._id
      delete result.__v
    },
  }

  const schema = new mongoose.Schema(paths)

  schema.set('toJSON', transformer)
  schema.set('toObject', transformer)

  return mongoose.model(name, schema)
}

const objectIdValidator = (id: string | number) =>
  mongoose.Types.ObjectId.isValid(id)

export { startMongo, stopMongo, mongoHealth, modelFactory, objectIdValidator }
