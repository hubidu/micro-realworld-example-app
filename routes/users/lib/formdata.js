const { text } = require('micro');
const compose = require('micro-compose');const querystring = require('querystring');
const formdata = async (req) => querystring.parse(decodeURIComponent(await text(req)))

module.exports = formdata;