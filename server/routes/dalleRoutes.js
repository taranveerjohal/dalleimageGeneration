import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
)

router.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello from dalleRoutes.js' })
})

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body
    console.log('prompt', prompt)
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    })

    const image = response.data.data[0].b64_json
    res.status(200).json({ photo: image })
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
})

export default router
