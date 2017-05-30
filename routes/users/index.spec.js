const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')

const handler = require('./index.js');

test('POST /users', async t => {
  const service = micro(handler);

  const url = await listen(service);
  const body = await request(url);

  t.deepEqual(JSON.parse(body).test, 'woot')
})