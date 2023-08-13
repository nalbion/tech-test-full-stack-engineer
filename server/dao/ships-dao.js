const pool = require('../db');

const getAllShips = async () => {
    return (await pool.execute('SELECT * FROM ships'))[0];
}

const deleteAllShips = () => {
    return pool.execute('DELETE FROM ships');
}

const insertShipForTest = async (ship) => {
    const connection = await pool.getConnection();
    try {
        const values = [[
            ship.id, ship.type, ship.mass_kg, ship.home_port, ship.name, ship.class, ship.image
        ]];
        await connection.query(`INSERT INTO ships (id, type, mass_kg, home_port, name, class, image) VALUES ?`, [values]);

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

const updateAllShips = async (ships) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Delete any old ships that are not in the new dataset
        const shipIds = ships.map(ship => ship.id);
        await connection.query('DELETE FROM ships WHERE id NOT IN (?)', [shipIds]);

        // Insert/update new ship data
        const values = ships.map(ship => [
            ship.id, ship.type, ship.mass_kg, ship.home_port, ship.name, ship.class
        ]);

        await connection.query(`INSERT INTO ships (id, type, mass_kg, home_port, name, class) 
            VALUES ?
            ON DUPLICATE KEY UPDATE
                type = VALUES(type),
                mass_kg = VALUES(mass_kg),
                home_port = VALUES(home_port),
                name = VALUES(name),
                class = VALUES(class)`,
            [values]);

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

/**
 * @param {string?} type - 'Barge', 'Cargo', 'High Speed Craft', 'Tug'
 * @param {number?} weight - filter by `mass_kg >= ?`
 * @param {string?} home_port
 * @param {number?} page - starts at & defaults to 1
 * @param {number?} limit - defaults to 10
 */
const searchShips = async (type, weight, home_port, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    let where = ''
    const params = [];

    if (type || weight || home_port) {
        where = 'WHERE ';

        if (type) {
            where += 'type = ?';
            params.push(type);
        }

        if (weight) {
            if (params.length) {
                where += ' AND ';
            }
            where += '(mass_kg >= ? OR mass_kg IS NULL)';
            params.push('' + weight);
        }

        if (home_port) {
            if (params.length) {
                where += ' AND ';
            }
            where += `lower(home_port) LIKE ?`;
            params.push(`%${home_port.toLowerCase()}%`);
        }
    }

    const results = await pool.query(
        `SELECT SQL_CALC_FOUND_ROWS type, mass_kg, home_port, name, class, image 
            FROM ships 
            ${where}
            LIMIT ${limit} OFFSET ${offset}`,
        params);

    const total_records = (await pool.execute('SELECT FOUND_ROWS() as total'))[0][0].total;
    const count = results[0].length;

    return {
        data: results[0],
        _meta: {
            page,
            limit,
            count,
            total_records
        }
    };
}

const getShipTypes = async () => {
    let results = await pool.query(`SELECT DISTINCT type FROM ships`);
    results = results[0].map(record => record.type)
        .sort();

    const count = results.length;

    return {
        data: results
    };
}

module.exports = {
    getShipTypes,
    searchShips,
    deleteAllShips,
    getAllShips,
    updateAllShips,
    insertShipForTest,
}
