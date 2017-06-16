const debug = require('debug')('micro-mongoose-autoparams')
const { createError } = require('micro-boom');
const mongoose = require('mongoose');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
const getModel = (modelName) => {
    try {
        return mongoose.model(modelName)
    } catch (err) {
        // suppress
        // debug(`No model for ${modelName}`);
    }
};

module.exports = exports = opts => fn => {
    return async (req, res) => {
        const { paramNameMap } = opts

        const paramsAndModels = Object.keys(req.params)
            .map(paramName => ({
                paramName,
                model: getModel(paramName) || getModel(capitalize(paramName))
            }))
            .filter(pm => !!pm.model)
        
        debug(`Found models for params ${paramsAndModels.length}`);

        const promises = paramsAndModels.map(pm => {
            if (paramNameMap[pm.paramName]) {
                // Search using the mapped property
                return pm.model.findOne({ [paramNameMap[pm.paramName]]: req.params[pm.paramName] })
            }
            return pm.model.findById(req.params[pm.paramName])            
        });

        try {
            const results = await Promise.all(promises);
            debug(`Got results ${results.length}`)

            results.forEach((result, i) => {
                const pm = paramsAndModels[i]
                if (!result) { 
                    debug('Result is null -> throwing 404')
                    throw createError(404, `No ${pm.paramName} with ${paramNameMap[pm.paramName]} '${req.params[pm.paramName]}'`)
                }

                req[`\$${pm.paramName}`] = result
            })

            debug('Calling next handler in chain...')
            return await fn(req, res)
        } catch (err) {
            debug('Catching error', err.message)
            if (!err.isBoom) throw createError(500, `Unexpected error - ${err}`)
            throw err
        }
    }
}
