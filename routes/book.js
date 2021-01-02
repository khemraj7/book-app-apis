var express = require('express');
var router = express.Router();
var Book = require('../model/Book');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  // console.log(req.query)
  // let resPerPage = 5;
  // let sort = {}
  // let page = parseInt(req.query.page) || 1;
  // let limit = resPerPage;
  // let skip = (page - 1) * resPerPage;

  // if (req.query.sortBy && req.query.orderBy) {
  //   sort[req.query.sortBy] = req.query.orderBy == 'desc' ? 1 : -1;
  // }

  let user_id = req.query.user_id;
  Book.find({ user_id: user_id }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  })
    // .sort(sort)
    // .skip(skip)
    // .limit(limit);
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
// router.post('/', function(req, res, next) {
//   Book.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.post('/', async (req, res, next) => {

  try {
    console.log("req.body", req.body)
    const book = new Book(req.body);
    const result = await book.save();
    res.send(result);
  } catch (error) {
    console.log(error.message)
  }
});

/* UPDATE BOOK */
// router.put('/:id', function(req, res, next) {
//   Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.put('/:id', (req, res, next) => {
  Book.findOneAndUpdate({ _id: req.params.id },
    { $set: req.body },
    { new: req }
  )
    .then((result) => {
      res.json({
        status: 200,
        Updated_Book: result
      })
    })
    .catch((err) => {
      res.json({
        status: 404,
        error: err
      });
    });
})

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Book Status
router.put('/:id', function (req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;