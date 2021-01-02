let mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
    gender: String,
    password: String
  });

  // validation
//function isEmailExists(email, callback) {
//   if (email) {
//       mongoose.models['User'].count({ _id: { '$ne': this._id }, email: email }, function (err, result) {
//           if (err) {
//               return callback(err);
//           }
//           callback(!result);
//       })
//   }
// }
// // createUser function
// module.exports.createUser = function(newUser, callback){
//   bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//   });
// }

  module.exports = mongoose.model('User', UserSchema);