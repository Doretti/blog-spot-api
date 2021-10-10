import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', router)

const PORT = process.env.PORT || 8080

const start = async () => {
  app.listen(PORT, () => {
    console.log('Server has been started on port:', PORT);
  })
}

start()

