const pool = require('../db');
const { deleteAllShips, getAllShips, updateAllShips, insertShipForTest } = require('./ships-dao');

describe('ships', () => {
    describe('updateAllShips', () => {
        it('should populate an empty db', async () => {
            // Given db is empty
            await deleteAllShips();
            // and some input data
            const ships = [
                { id: '123', name: 'Test 123', type: 'Cargo', mass_kg: 2000, home_port: 'Port Test', class: 123 },
                { id: '456', name: 'Test 456', type: 'Tug', mass_kg: 1000, home_port: 'Port Test', class: 456 },
            ]

            // When updated
            await updateAllShips(ships);

            // Then
            const records = await getAllShips();
            expect(records).toHaveLength(2);
        });

        it('should remove records not in new dataset', async () => {
            // Given db has "Test 789"
            await deleteAllShips();
            await insertShipForTest({ id: '789', name: 'Test 789', type: 'Tug', mass_kg: 789, home_port: 'Port Test', class: 789 });
            // and some input data that does not include "Test 789"
            const ships = [
                { id: '123', name: 'Test 123', type: 'Cargo', mass_kg: 2000, home_port: 'Port Test', class: 123 },
                { id: '456', name: 'Test 456', type: 'Tug', mass_kg: 1000, home_port: 'Port Test', class: 456 },
            ]

            // When updated
            await updateAllShips(ships);

            // Then
            const records = await getAllShips();
            expect(records).toHaveLength(2);
        });

        it('should update ship data but not image', async () => {
            // Given db has "Test 789"
            await deleteAllShips();
            await insertShipForTest({ id: '123', name: 'Old Name', type: 'Tug', home_port: 'Port Test', image: 'http://example.com/image.png'});
            // and some input data that does not include "Test 789"
            const ships = [
                { id: '123', name: 'Test 123', type: 'Cargo', mass_kg: 2000, home_port: 'Port Test', class: 123 },
                { id: '456', name: 'Test 456', type: 'Tug', mass_kg: 1000, home_port: 'Port Test', class: 456 },
            ]

            // When updated
            await updateAllShips(ships);

            // Then
            const records = await getAllShips();
            expect(records).toHaveLength(2);
            expect(records[0]).toEqual({
                id: '123', name: 'Test 123', type: 'Cargo', mass_kg: 2000, home_port: 'Port Test', class: 123,
                image: 'http://example.com/image.png',
            });
        });
    });
})
