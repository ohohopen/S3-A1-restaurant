const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(port, () => {
  console.log('app is connecting.')
})