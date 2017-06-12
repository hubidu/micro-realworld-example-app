const micro = require('micro')
const { startMicro } = require('micro-test')
const test = require('ava')
const faker = require('faker')
const got = require('got')

const postRequestHandler = require('./index.post.js')

test('POST /users with username, email, password should create new user successfully', async t => {
  const url = await startMicro(postRequestHandler);

  const body = JSON.stringify({
    user: {
      username: `${faker.name.firstName()}${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: 'mysecret'
    }
  })
  const response = await got.post(url, { body })
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

  const error = await t.throws(got.post(url, { body }))
  const responseBody = JSON.parse(error.response.body)
  t.is(responseBody.message, 'Mongoose validation error')
})