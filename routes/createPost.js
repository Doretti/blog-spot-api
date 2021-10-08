const express = require('express')
const Post = require('../models/post.model')
const router = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')

router.post('/posts', async (req, res) => {
  try {
    const {
      text,
      title,
      mediaId
    } = req.body
    const tokenInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)

    if (!text || !title) {
      return res.json({
        message: "Not enough data"
      }).status(400)
    }

    const post = await Post.create({
      text,
      title,
      mediaId,
      authorId: tokenInfo.userId
    })

    return res.json({
      ...post.dataValues
    }).status(500)

  } catch (error) {
    return res.json(error).status(400)
  }

})

module.exports = router