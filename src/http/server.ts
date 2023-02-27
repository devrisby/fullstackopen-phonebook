import express from 'express'

const app = express()

const startHTTP = (port: string) =>
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })

export { app, startHTTP }
