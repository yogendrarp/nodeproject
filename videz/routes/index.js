var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/videz");

var collection = db.get("videos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "UTD!" });
});


/* GET home page. */
router.get("/videos", function (req, res, next) {
  collection.find({}, function (err, videos) {
    if (err) throw err;
    res.render('index', { videos });
  });
});

router.get("/videos/new", function (req, res) {
  res.render('new');
});

router.post("/videos", function (req, res, next) {
  collection.insert(
    /* req.body*/ {
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      available: false
    },
    function (err, video) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.redirect('/videos');
    }
  );
});

router.get("/videos/:id", function (req, res, next) {
  collection.findOne({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.render('show', { video });
  });
});

module.exports = router;
