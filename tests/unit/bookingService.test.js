const bookingService = require('../../backend/services/bookingService');

// Básico unit test. Para pruebas más exhaustivas, mockearíamos la conexión a BD.
describe('Booking Service Logic Tests', () => {
    it('Debe lanzar error si checkout es antes o igual a checkin', () => {
        const mockData = {
            check_in: '2026-05-10',
            check_out: '2026-05-09',
            room_id: 1,
            guests: 2,
            guest_name: 'Test',
            guest_email: 'test@t.com'
        };
        
        expect(() => {
            bookingService.createBooking(mockData);
        }).toThrow('Check-out debe ser después del check-in.');
    });
    
    it('Debe lanzar error si faltan datos requeridos', () => {
        const mockData = {
            check_in: '2026-05-10',
            check_out: '2026-05-15',
            // faltan campos...
        };
        expect(() => {
            bookingService.createBooking(mockData);
        }).toThrow('Faltan datos en la reservación.');
    });
});
