const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const router = require('./routes')
require('./mongoose/mongoose')
app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(router)
app.listen(port, () => {
  console.log('app is connecting.')
})