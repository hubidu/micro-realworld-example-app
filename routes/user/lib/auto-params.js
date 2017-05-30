const debug = require('debug')('micro-mongoose-autoparams')
const { createError } = require('micro');
const mongoose = require('mongoose');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
const getModel = (modelName) => {
    try {
        return mongoose.model(modelName)
    } catch (err) {
        // suppress
        debug(`No model for ${modelName}`);
    }
};

module.exports = exports = (fn) => {
    return async (req, res) => {
        const paramsAndModels = Object.keys(req.params)
            .map(paramName => ({
                paramName,
                model: getModel(paramName) || getModel(capitalize(paramName))
            }))
            .filter(pm => !!pm.model);
        
        debug(`Found models for params ${paramsAndModels.length}`);

        const promises = paramsAndModels.map(pm => pm.model.findById(req.params[pm.paramName]))

        try {
            const results = await Promise.all(promises);
            debug(`Got results ${results.length}`);

            results.forEach((result, i) => {
                const pm = paramsAndModels[i];
                if (!result) throw createError(404, `No ${pm.paramName} with id ${req.params[pm.paramName]}`);

                req[`\$${pm.paramName}`] = result;
            })

            return fn(req, res);
        } catch (err) {
            throw createError(500, `Unexpected error - ${err}`)
        }
    }
}
