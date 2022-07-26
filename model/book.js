let mongoose = require('mongoose')
var BookSchema = new mongoose.Schema(
  {
    isbn: { type: String },
    title: { type: String },
    author: { type: String },
    description: { type: String },
    published_year: { type: String },
    publisher: { type: String },
    price: { type: String },
    status: { type: Boolean, default: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', BookSchema)
