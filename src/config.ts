import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? '3001'
const MONGO_URI =
  process.env.NODE_ENV === 'prod'
    ? process.env.MONGO_URI
    : process.env.LOCAL_MONGO_URI

export { PORT, MONGO_URI }
