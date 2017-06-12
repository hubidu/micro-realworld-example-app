const { createError, json } = require('micro');
const compose = require('micro-compose');

module.exports = compose()(
    async (req, res) => {
        const routes = req.$routes

        return [].concat(
            ['ROUTES'],
            ['======'],
            '',
            routes.map(r => `${r.methods}\t${r.path}`)
        ).join('\n')
    }
);
