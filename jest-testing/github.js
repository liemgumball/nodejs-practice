module.exports.getGithubUser = (username) => {
	return fetch('https://api.github.com/users/' + username)
		.then((res) => res.json())
		.then((json) => json)
		.catch(console.error)
}
