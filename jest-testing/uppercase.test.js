const uppercase = require('./uppercase')

describe('uppercase', () => {
	test('should uppercase the string', () => {
		expect(uppercase('hello')).toBe('HELLO')
	})
})
