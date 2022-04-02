const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/s3-a1-restaurant')
const db = mongoose.connection
db.on('error', () => {
  console.log('db is fail')
})
db.once('open', () => {
  console.log('db is ok')
})