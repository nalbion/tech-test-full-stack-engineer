const spacex = require('./spacex');
describe('spacex service', () => {
    it('should query all ships with large page', async () => {
        let ships = await spacex.queryShips({}, 1, 1000);

        expect(ships.docs).toHaveLength(29);
        expect(ships.docs[0]).toEqual({
            class: 7604342, 
            home_port: 'Port of Los Angeles', 
            id: '5ea6ed2d080df4000697c901', 
            image: 'https://i.imgur.com/woCxpkj.jpg', 
            mass_kg: 266712, 
            name: 'American Champion', 
            type: 'Tug'
        })
    });

    it('should query ships by type with large page', async () => {
        let ships = await spacex.queryShips({ type: 'Cargo' }, 1, 1000);

        expect(ships.docs).toHaveLength(11);
        expect(ships.docs.filter(ship => ship.type == 'Cargo')).toHaveLength(11);
    });

    it('should query paged ships by type', async () => {
        let ships = await spacex.queryShips({ type: 'Cargo' }, 1);

        expect(ships.docs).toHaveLength(10);

        ships = await spacex.queryShips({ type: 'Cargo' }, 2);
        expect(ships.docs).toHaveLength(1);
    });
})
