var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
const mongoose = require('./database')
const cors = require('cors')

var book = require('./routes/book')
const user = require('./routes/user')

var app = express()
app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'false' }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/books', express.static(path.join(__dirname, 'dist')))
app.use('/book', book)

app.use('/user', user)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, X-Content-Length, X-Chunks-Quantity, X-Content-Id, X-Chunk-Id, X-Content-Name, Accept, app-key, app-id, user-id, password'
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.get('/', (req, res) => {
  res.json({
    msg: 'hello',
  })
})

module.exports = app
