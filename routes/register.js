import { Router } from 'express'
const router = Router()
import bcj from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodeFetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const hasuraCommit = async (query) => await (await nodeFetch('https://blog-spo.hasura.app/v1/graphql', {
  method: 'POST',
  body: JSON.stringify({query}),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.HASURA_SECRET
  }
})).json()

const createUser = (username, password, email) => `
mutation MyMutation {
  insert_users_one(object: {username: "${username}", email: "${email}", password_hash: "${password}"}) {
    avatarId
    createdAt
    email
    headerId
    id
    password_hash
    role
    username
  }
}

`

router.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body
  
    if (!username || !email || !password) return res.status(400).send({error: 'Not enough data'})

    const encpwd = bcj.hashSync(password, 10)
  
    payload = { "userId": user.dataValues.id }
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })

    const user = await hasuraCommit(createUser(username, encpwd, email))

    return res.status(200).send({
      username: user.data.insert_users_one.username,
      email: user.data.insert_users_one.email,
      token
    })

  } catch (error) {
    return res.json(error).status(400)
  }
})

export default router