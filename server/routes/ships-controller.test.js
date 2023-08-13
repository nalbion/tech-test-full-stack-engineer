const { searchShips } = require('./ships-controller');

describe('ships-controller', () => {
    it('should search ships by type, weight and home_port', async () => {
        // Given
        const req = {
            query: {
                // type: 'Cargo',
                weight: 2000000,
                // home_port: 'canavera',
                page: 2,
                limit: 4,
            }
        }
        const res = {
            status: (code) => { console.info('status code:', code) },
            send: (body) => { console.info('send body:', body) },
        };

        // When
        const response = await searchShips(req, res);

        // Then
        console.info(response);
    });
})
