var express = require('express');
var router = express.Router();

const { rows } = require('../util/db')

router.get('/', async function(req, res, next) {

	if (req.session.userId) {
		res.render('admin', {
			orders: await rows('select o.*, c.name as course_name from orders as o join courses as c on c.id = o.course_id')
		})
	}
	else {
		res.redirect('/admin/login')
	}
});

router.get('/login', async function(req, res, next) {

	if (req.session.userId) {
		res.redirect('/admin')
	}

	res.render('login')
});

router.post('/login', async function(req, res, next) {

	if (req.session.userId) {
		res.redirect('/admin')
	}

	const [login] = await rows(`
		select user_id from users
	where username = $1 and password = crypt($2, password)
	`,

		req.body.username,
		req.body.password,

	)

	if (!login) {

		res.redirect('/admin/login')
	}
	else {

		req.session.userId = login.user_id

		res.redirect('/admin')
	}
});

module.exports = router;




/* var express = require('express');
var router = express.Router();

const { rows } = require('../util/db')

const ordersQuery = `
  select * from orders as o join courses as c on c.id = o.course_id
`

const usersQuery = `
  select user_id from users
	where username = $1 and password = crypt($2, password);
`

router.get('/', async function(req, res, next) {

  if(!req.session.userId) {

    const orders = await rows(ordersQuery)
    res.render('admin', { orders});
  } else {
    res.redirect('admin/login')
  }
});

router.get('/login', async function(req, res, next) {

  if(req.session.userId) {
    res.redirect('/admin');
  }

  res.render('login')
});

router.post('/login', async (req, res, next) => {

  if(req.session.userId) {
    res.redirect('/admin');
  }

  const [login] = await rows (usersQuery, req.body.username, req.body.password)

  if(!login) {
    res.redirect('/admin/login')
  } else {
    req.session.userId = login.user_id

    res.redirect('/admin')
  }
})

module.exports = router;
 */