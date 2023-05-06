import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import ConnectDB from './mongoDb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/dalles', dalleRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  try {
    ConnectDB(process.env.MONGO_URL)
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT} with link - http://localhost:${process.env.PORT}`
      )
    })
  } catch (e) {
    console.log(e)
  }
}

startServer()
