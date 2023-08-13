const express = require('express');
const { query } = require('express-validator');
const bodyParser = require('body-parser');
const { initScheduledJobs } = require('./scheduled');
const { refreshShips } = require('./scheduled/refresh-ships');
const { searchShips } = require('./routes/ships-controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// In case we haven't ever/recently refreshed ships data.
refreshShips();
// refresh stale jobs every 24 hours.
initScheduledJobs();

app.get('/', async (req, res) => {
    // const rows = await dbPool.query('SELECT * FROM ships');
    const rows = [];
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.get('/ships',
    query('type', 'Invalid ship type').optional().isIn(['Barge', 'Cargo', 'High Speed Craft', 'Tug']),
    query('weight', 'Invalid weight').optional().isNumeric({ no_symbols: true }),
    query('home_port', 'Invalid home port').optional().notEmpty().escape(),
    query('page', 'Invalid page number').optional().isNumeric({ no_symbols: true }),
    query('limit', 'Invalid page limit').optional().isNumeric({ no_symbols: true }),
    searchShips)

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);
