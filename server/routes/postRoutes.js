import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../mongoDb/models/post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ sucess: true, data: posts })
  } catch (e) {
    res.status(500).json({ sucess: false, message: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, prompt, image } = req.body
    const result = await cloudinary.uploader.upload(image)
    const post = await Post.create({
      name,
      prompt,
      image: result.secure_url,
    })
    res
      .status(201)
      .json({ sucess: true, data: post, message: 'Post created sucessfully' })
  } catch (e) {
    res.status(409).json({ sucess: false, message: e.message })
  }
})

export default router
