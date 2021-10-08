const express = require('express')
const signup = require('./signup')
const authorization = require('./authorization')
const upload = require('./upload')
const updateDataUser = require('./updateDataUser')
const getUserData = require('./getUserData')
const getPostsByPage = require('./getPostsByPage')
const createPost = require('./createPost')

const router = express.Router()
router.use(signup)
router.use(authorization)
router.use(upload)
router.use(updateDataUser)
router.use(getUserData)
router.use(getPostsByPage)
router.use(createPost)

module.exports = router