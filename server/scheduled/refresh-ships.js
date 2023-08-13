const spaceX = require('../services/spacex');
const { updateAllShips } = require('../dao/ships-dao');


const refreshShips = async () => {
    // Get latest ships data from SpaceX API
    const ships = await spaceX.listAllShips();

    // Update our DB
    await updateAllShips(ships);
}


module.exports = {
    refreshShips,
}
