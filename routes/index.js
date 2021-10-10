import { Router } from 'express'
import signup from './register.js'
import authorization from './login.js'

const router = Router()
router.use(signup)
router.use(authorization)

export default router