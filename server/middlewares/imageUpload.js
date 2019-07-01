'use strict'
require('dotenv').config()

const {Storage} = require('@google-cloud/storage')
console.log(process.env.CLOUD_BUCKET);

console.log(process.env.KEYFILE_PATH);
console.log(process.env.GCLOUD_PROJECT);

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  console.log(filename,'filename')
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  console.log('masuk gcs')
  console.log(req.body);
  
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
  console.log('masuk err')
    
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
  console.log('masuk finish')

    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}