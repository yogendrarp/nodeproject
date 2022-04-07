var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/videz");

var collection = db.get("videos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "UTD!" });
});

module.exports = router;
