function reverse(sentence) {
	const words = sentence.split(' ')
	return words.reverse().join(' ')
}

module.exports = reverse
