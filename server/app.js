require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./helpers/errorHandler')

mongoose.connect(process.env.MONGODB_URL+process.env.NODE_ENV, {useNewUrlParser: true})
.then(resp => {
    console.log("we're connected")
})
.catch(err => {
    console.log("we failed to connect")
})

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())


app.use('/', router)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening in port '+port);
    
})
module.exports = app