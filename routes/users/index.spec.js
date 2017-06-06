const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const faker = require('faker')
const got = require('got')

const postRequestHandler = require('./index.js').POST
/**
 * Helper to start micro lambda
 * TODO How can I make that generic?
 */
const startMicro = async (handlerFn) => {
  const { handleErrors } = require('micro-boom')
  const ctx = require('../../context');
  const { provideContext } = require('../../provide-context.js');
  const { handleMongooseErrors } = require('../../micro-mongoose.js');

  const service = micro(
    handleErrors(handleMongooseErrors()(provideContext(ctx)(handlerFn)))
  )
  const url = await listen(service)
  return url
}

test('POST /users with username, email, password should create new user successfully', async t => {
  const url = await startMicro(postRequestHandler);

  const body = JSON.stringify({
    user: {
      username: `${faker.name.firstName()}${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: 'mysecret'
    }
  })
  const response = await got(url, { body })
  t.is(response.statusCode, 200)

  const responseBody = JSON.parse(response.body)
  t.truthy(responseBody.token)
})

test('POST /users with invalid username should return a 400 error', async t => {
  const url = await startMicro(postRequestHandler);

  const body = JSON.stringify({
    user: {
      username: '12321#+.',
      email: faker.internet.email(),
      password: 'mysecret'
    }
  })

  const error = await t.throws(got(url, { body }))
  const responseBody = JSON.parse(error.response.body)

  t.is(responseBody.message, 'Mongoose validation error')
})