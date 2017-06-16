/**
 * Find the user object from the authentication token
 * and attach the user object to the request
 */
module.exports = exports = opts => fn => async (req, res) => {
    if (req.jwt) {
        const User = req.$ctx.User
        
        const authenticatedUser = await User.findById(req.jwt.id)
        if (!authenticatedUser) throw createError(401, `No user with id ${req.jwt.id}`)

        req.$authenticatedUser = authenticatedUser
    }
    return await fn(req, res)
}