const { validationResult } = require('express-validator');
const cache = require('../cache');
const dao = require('../dao/ships-dao');

/**
 * Request validation is done in app.js by express-validator.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const searchShips = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.send(errors);
        return;
    }

    const { type, weight, home_port, page, limit } = req.query;

    const cacheKey = `ships_${type}_${weight}kg_${home_port}_${page}_${limit}`;
    let results = await cache.get(cacheKey);

    try {
        if (!results) {
            results = await dao.searchShips(type, weight, home_port, page, limit);
            await cache.set(cacheKey, results);
        }

        res.status(200);
        res.send(results);
    } catch (err) {
        res.status(500);
        res.send({ errors: [{ msg: err.toString() }] })
    }
}

const getShipTypes = async (req, res) => {
    const cacheKey = `ships_types`;
    let results = await cache.get(cacheKey);

    try {
        if (!results) {
            results = await dao.getShipTypes();
            await cache.set(cacheKey, results);
        }

        console.info('ship types:', results);

        res.status(200);
        res.send(results);
    } catch (err) {
        res.status(500);
        res.send({ errors: [{ msg: err.toString() }] })
    }
}

// TODO: upload ship icon, store as ship attribute

module.exports = {
    searchShips,
    getShipTypes,
}
