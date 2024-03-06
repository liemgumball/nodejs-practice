module.exports = {
	root: true,
	env: { es2021: true, node: true },
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['@typescript-eslint'],
	rules: {},
}
