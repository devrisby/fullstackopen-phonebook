import express from 'express'
import { mongoHealth } from '../data/mongo'
import PersonRouter from '../modules/person/personController'

const router = express.Router()

router.get('/api/health', async (req, res) => {
  const dbHealth = await mongoHealth()
  const appHealth = {
    status: 'OK',
    uptime: `${process.uptime().toFixed(2)} seconds`,
    database: dbHealth,
    date: new Date().toLocaleString(),
  }

  res.status(200).json(appHealth)
})

router.use('/api/persons', PersonRouter)

export default router
