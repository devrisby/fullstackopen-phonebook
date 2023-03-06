import mongoose from 'mongoose'

const startMongo = async (uri: string) => await mongoose.connect(uri)
const stopMongo = async () => {
  await mongoose.connection.close()
}
const mongoHealth = async () => await mongoose.connection.db.stats()

export { startMongo, stopMongo, mongoHealth }
