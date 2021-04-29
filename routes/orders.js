var express = require('express');
var router = express.Router();

const { rows } = require("../util/db")

const creaetOrder = `
  insert into orders(fullname, tel, age, course_id) values ($1, $2, $3, $4) returning *
`

const coursesSql = `
  select * from courses
`

router.get('/', async function(req, res, next) {

  const courses = await rows(coursesSql)

  res.render('orders', {
    courses,
  });
});

router.post('/', async function(req, res, next) {

  const { fullname, tel, age, courseId} = req.body

  try {
    const newOrder = await rows(creaetOrder, fullname, tel, age, courseId)
    req.session.newOrder = newOrder

    res.redirect('/')
  }
  catch(e) {
    res.send({message: e.message})
  }

});

module.exports = router;
