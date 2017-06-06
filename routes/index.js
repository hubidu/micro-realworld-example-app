const { createError, json } = require('micro');
const compose = require('micro-compose');

module.exports = compose()(
    async (req, res) => {
        const routes = req.$ctx.routes

        return `
            ${routes.map(r => r.path).join('\n')}
        `
    }
);
