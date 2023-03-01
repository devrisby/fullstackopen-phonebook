import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { httpLogger, errorHandler, unknownEndpoint } from './middleware'
import router from './router'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.static('dist_client'))
app.use(httpLogger())
app.use(router)
app.use(errorHandler)
app.use(unknownEndpoint)

const startHTTP = (port: string) => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

export { app, startHTTP }
