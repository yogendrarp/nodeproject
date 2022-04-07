var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/videz");

var collection = db.get("videos");

/* GET home page. */
router.get("/", function (req, res, next) {
  collection.find({}, function (err, videos) {
    if (err) throw err;
    res.json(videos);
  });
});

router.get("/:id", function (req, res, next) {
  collection.findOne({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.json(video);
  });
});

router.post("/", function (req, res, next) {
  console.log("Welcome ")
  console.log(req.body);
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
      res.json(video);
    }
  );
});

router.put("/:id", function (req, res, next) {
  collection.update(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        available: req.body.available,
      },
    },
    function (err, video) {
      if (err) throw err;
      res.json(video);
    }
  );
});

router.delete("/:id", function (req, res, next) {
  collection.remove({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.json(video);
  });
});

module.exports = router;
