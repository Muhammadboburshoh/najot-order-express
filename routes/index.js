var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  req.session.views = (req.session.views ||0) + 1

  const newOrder = req.session.newOrder

  req.session.newOrder = null

  res.render('index', {
    title: 'Express',
    views: req.session.views,
    newOrder: newOrder
  });
});

module.exports = router;
