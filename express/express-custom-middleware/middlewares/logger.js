module.exports = logger = () => (req, res, next) => {
	console.log(
		"Request received in middleware's logger: ",
		req.method,
		req.url
	)
	next()
}
