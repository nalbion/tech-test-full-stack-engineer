const axios = require('axios');

const baseUrl = 'https://api.spacexdata.com';

const listAllShips = async () => {
    const response = await axios.get(`${baseUrl}/v4/ships`, {
        headers: {
            Accept: 'application/json',
        }
    });

    return response.data;
}

/**
 * @param {{ type: string, weight?: number, home_port?: string }} query
 * @param {number} page - starts at 1
 * @param {number} limit - defaults to 10
 */
const queryShips = async (query, page = 1, limit = 10) => {
    const response = await axios.post(`${baseUrl}/v4/ships/query`, {
        query,
        options: { page, limit, select: 'type mass_kg home_port name class image' }
    }, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    return response.data;
}

module.exports = {
    listAllShips,
    queryShips,
}
