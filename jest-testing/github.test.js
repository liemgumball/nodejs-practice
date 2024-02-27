const github = require('./github')
const data = require('./userData')

global.fetch = jest.fn()

beforeEach(() => {
	fetch.mockClear()
})

describe('mock test', () => {
	it('should get user', async () => {
		fetch.mockResolvedValueOnce({
			json: async () => Promise.resolve(data),
		})
		const githubUser = await github.getGithubUser('octokit')

		expect(githubUser.id).toBe(3430433)
		expect(githubUser.login).toBe('octokit')
		expect(githubUser.name).toBe('Octokit')
	})
})

describe('spy test', () => {
	it('should get user', async () => {
		const spy = jest
			.spyOn(github, 'getGithubUser')
			.mockImplementationOnce(() => data)
		const githubUser = await github.getGithubUser('octokit')

		expect(spy).toHaveBeenCalled()
		expect(githubUser.id).toBe(3430433)
		expect(githubUser.login).toBe('octokit')
		expect(githubUser.name).toBe('Octokit')
	})
})
