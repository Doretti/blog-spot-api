const express = require('express')
const Post = require('../models/post.model')
const router = express.Router()
require('dotenv').config()

router.get('/posts/:page', async (req, res) => {
  try {
    const {
      page
    } = req.params

    const posts = await Post.findAll({
      offset: page * 20,
      limit: 20
    })

    if (!user.email) {
      return res.json({
        message: 'User not found'
      }).status(400)
    }

    return res.json({
      ...posts
    })

  } catch (error) {
    return res.json(error).status(400)
  }

})

module.exports = router