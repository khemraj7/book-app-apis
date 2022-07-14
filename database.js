let mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected Successfully')
  })
  .catch(() => {
    console.log('Failed Connection...')
  })

module.exports = mongoose
