describe('uppercase', () => {
	test('should uppercase', () => {
		const uppercase = jest.fn(() => 'HELLO')
		const result = uppercase('hello')

		expect(uppercase).toHaveBeenCalledWith('hello')
		expect(result).toBe('HELLO')
	})
})
