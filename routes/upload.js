const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const Upload = require('../models/upload.model')
require('dotenv').config()

router.post('/upload', async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      const file = req.files.file
      const name = uuid.v4()

      if (file.mimetype.split('/')[0] !== 'image') {
        return res.json({
          status: false,
          message: 'Allowed to upload only pictures'
        }).status(400)
      }

      const path = './public/' + name + '.' + file.mimetype.split('/')[1]

      file.mv(path);

      const upload = await Upload.create({
        mimetype: file.mimetype,
        size: file.size,
        path: 'public/' + name + '.' + file.mimetype.split('/')[1]
      })

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          ...upload.dataValues
        }
      });
    }

    res.json({
      file
    })
  } catch (error) {
    
  }

})

module.exports = router