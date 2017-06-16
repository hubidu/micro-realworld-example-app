const { createError, json } = require('micro');
const compose = require('micro-compose');

const formatComment = (comments) => {
    if (comments.length === 0) return ''
    if (comments[0].type !== 'CommentBlock') return ''

    return comments[0].value.replace(/\*/g, '').trim() + '\n'
}

module.exports = compose()(
    async (req, res) => {
        const routes = req.$routes

        return [].concat(
            ['ROUTES'],
            ['======'],
            '',
            routes.map(r => `${r.methods}\t${r.path} \n  ${formatComment(r.comment)}`)
        ).join('\n')
    }
);
