const { refreshShips } = require('./refresh-ships');
const { getAllShips } = require('../dao/ships-dao');

describe('refresh-ships', () => {
    it('updates DB with latest ships data from SpaceX', async () => {
        await refreshShips();

        const records = await getAllShips();
        expect(records).toHaveLength(29);
    })
})
