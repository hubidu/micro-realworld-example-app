const { send, createError } = require('micro');
const compose = require('micro-compose');
const visualize = require('micro-visualize');
// TODO: Add back micro-boom for json responses

const routerConfig = {
    filter: f => f.indexOf('lib') === -1
}
const match = require('fs-router')(__dirname + '/routes', routerConfig);
// TODO: Serve routes as index
const routes = match._routes.map(r => `  ${r.methods} ${r.path.trim()}`).join('\n');
console.log(`
Routes:
=======
${routes}`
);

const { connect } = require('./mongoose-connect');

connect();

module.exports = visualize(
    async function(req, res) {
        let matched = match(req)

        if (matched) return await matched(req, res)

        throw createError(404, 'Route not found');
    }, process.env.NODE_ENV
);

