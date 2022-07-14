const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const http = require('http')
const app = require('./app')
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running at Port ${port}`)
})
