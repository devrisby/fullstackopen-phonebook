import { startHTTP } from './http/server'
import { startMongo } from './data/mongo'
import * as config from './config'

const main = async () => {
  startHTTP(config.PORT)
  await startMongo(config.MONGO_URI!)
}

main().catch(e => {
  console.log(e)
})
