const axios = require('axios');

// TODO: move to .env
const baseUrl = 'http://localhost:4000';

/**
 * @param {{ type, weight, home_port, page, limit }} params
 * @returns {Promise<{data: {}, _meta: {}}>}
 */
const searchShips = async (params) => {
    const response = await axios.get(`${baseUrl}/ships`,
        { params });

    return response.data;
}

const getShipTypes = async (params) => {
    const response = await axios.get(`${baseUrl}/ships/types`);
    return response.data.data;
}

module.exports = {
    searchShips,
    getShipTypes,
};
