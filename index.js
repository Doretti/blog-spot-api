const express = require('express')
const router = require('./routes')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/public'))
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

