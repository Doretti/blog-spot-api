const express = require('express')
const router = require('./routes')
const sequelize = require('./sequelize')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
require('./models/index')
require('dotenv').config()

const app = express()

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', router)

const PORT = process.env.PORT || 1911

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(PORT, () => {
    console.log('Server has been started on port:', PORT);
  })
}

start()
