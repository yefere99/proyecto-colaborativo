const request = require('supertest');
const app = require('../../backend/app');

describe('API Endpoints', () => {
    it('GET /api/v1/rooms debe retornar 200 y una lista de habitaciones', async () => {
        const res = await request(app).get('/api/v1/rooms');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(Array.isArray(res.body.data)).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/bookings debe retornar 200 y una lista de reservas', async () => {
        const res = await request(app).get('/api/v1/bookings');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });
});
