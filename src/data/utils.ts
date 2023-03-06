import mongoose, { Schema } from 'mongoose'

const modelFactory = <T>(name: string, paths: any) => {
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

  const schema = new Schema<T>(paths)

  schema.set('toJSON', transformer)
  schema.set('toObject', transformer)

  return mongoose.model<T>(name, schema)
}

const objectIdValidator = (id: string | number) =>
  mongoose.Types.ObjectId.isValid(id)

export { modelFactory, objectIdValidator }
