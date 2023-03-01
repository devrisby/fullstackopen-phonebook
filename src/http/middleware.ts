import type { ErrorRequestHandler, RequestHandler } from 'express'
import morgan from 'morgan'

const httpLogger = () => {
  // @ts-ignore
  morgan.token('body', (req, res) => JSON.stringify(req.body))
  return morgan(':method :url :body')
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.name === 'ApiError')
    res
      .status(error.status)
      .json({ status: error.status, cause: error.cause, error: error.name })
  else res.status(503).json({ message: 'Server Error', error: error.message })
}

const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).json({ status: 404, error: 'Unknown endpoint' })
}

export { httpLogger, errorHandler, unknownEndpoint }
