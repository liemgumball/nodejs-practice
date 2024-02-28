const { Router } = require('express')
const router = Router()

router.get('/login', (req, res) => {
	res.render('login', { fail: false })
})

router.post('/login', (req, res, next) => {
	if (req.session.user) {
		res.redirect('/')
		next()
		return
	}
	if (req.body.username === 'liem' && req.body.password === 'pwd') {
		req.session.user = { name: req.body.username }
		res.redirect('/')
		next()
		return
	}

	res.render('login', { fail: true })
	next()
})

router.get('/logout', (req, res) => {
	req.session.user = null
	res.redirect('/')
})

module.exports = router
