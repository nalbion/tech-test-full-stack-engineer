const { createClient } = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const client = createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const cache = {};

const get = async (key) => {
    // return client.get(key);
    return cache[key];
}

// TODO: Fix Redis, manage TTL & call refreshShips() every 24 hours
const set = async (key, value) => {
    // return client.set(key, value);
    cache[key] = value;
}

module.exports = {
    get,
    set,
}
