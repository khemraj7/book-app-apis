let mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  gender: String,
  password: String,
},{timestamps:true})
module.exports = mongoose.model('User', UserSchema)
