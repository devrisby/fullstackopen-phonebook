import { startHTTP } from './http/server'
import * as config from './config'

const main = () => {
  startHTTP(config.PORT)
}

main()
