const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')

const signup = async (req, res, next) => {
  let isUserExist = await isEmailExist(req.body.email)
  // console.log("isUserExist", isUserExist)
  if (isUserExist) {
    return res.json({
      message: 'Email Already Exist ',
      status: 422,
    })
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({
        error: err,
      })
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash,
      })
      user
        .save()
        .then((result) => {
          if (result) {
            let token = jwt.sign({ name: user.name }, 'VerySecretValue', {
              expiresIn: '1h',
            })
            result.password = ''
            res.json(
              result
              //     {
              //     message: 'Signup Successfully',
              //     status: 200,
              //     user: result
              // }
            )
          }
        })
        .catch((error) => {
          res.status(500).json({
            error: err,
          })
        })
    }
  })
}

const login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  User.findOne({ $or: [{ email: username }] }).then((user) => {
    console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          })
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, 'VerySecretValue', {
            expiresIn: '1h',
          })
          user.password = ''
          res.json({
            message: 'login Successfully',
            status: 200,
            user: user,
          })
        } else {
          res.json({
            message: 'Password does not match',
            status: 206,
          })
        }
      })
    } else {
      res.json({
        message: 'No user Found',
        status: 404,
      })
    }
  })
}

const isEmailExist = async (email) => {
  let user = await User.findOne({ email: email })
  console.log('user', user)
  if (user) return true
}

const user = async (req, res, next) => {
  try {
    const results = await User.find()
    res.send(results)
  } catch (error) {
    res.json({
      error: error,
    })
  }
}

let userById = async (req, res, next) => {
  const id = req.params.id
  try {
    //const student = await Student.findById(id)
    const user = await User.findOne({ _id: id })
    res.send(user)
  } catch (error) {
    res.json({
      error: error,
    })
  }
}
let UserUpdate = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
      },
    }
  )
    .then((result) => {
      res.json({
        Updated_User: result,
      })
    })
    .catch((err) => {
      res.json({
        error: err,
      })
    })
}

module.exports = { signup, login, user, userById, UserUpdate }
