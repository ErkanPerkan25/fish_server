const express = require("express");
var router = express.Router();

/* GET home page*/
router.get("/", function(req, res, next) {
    res.render("index", {title: "Fishing Nerds"});
});

/**/

router.get("/machine", function(req, res, next) {
    var os = require("os");
    var host = os.hostname();

    res.end("Request processed by " + os.hostname);
})

module.exports = router;
