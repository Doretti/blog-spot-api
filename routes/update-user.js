const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
require('dotenv').config()

router.post('/users/:id', async (req, res) => {
  try {
    const {
      email,
      username,
      avatarId
    } = req.body

    const {
      id
    } = req.params

    const user = await User.update({
      email,
      username,
      avatarId
    }, {
      where: {
        id
      }
    })
    .success(result => res.json({...result}))
    .error(err => res.status(400).send({...err}))

    return res.json({
      ...user
    })

  } catch (error) {
    return res.json(error).status(400)
  }

})

module.exports = router