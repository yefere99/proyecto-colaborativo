const bookingService = require('../services/bookingService');

exports.createBooking = (req, res, next) => {
    try {
        const data = req.body;
        const result = bookingService.createBooking(data);
        res.status(201).json({ success: true, data: result, message: 'Reservación creada con éxito' });
    } catch (error) {
        // Enviar error 400 por validaciones de negocio
        res.status(400);
        next(error);
    }
};

exports.getAllBookings = (req, res, next) => {
    try {
        const bookings = bookingService.getAllBookings();
        res.json({ success: true, data: bookings });
    } catch (error) {
        next(error);
    }
};

exports.getBookingById = (req, res, next) => {
    try {
        const booking = bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Reservación no encontrada' });
        }
        res.json({ success: true, data: booking });
    } catch (error) {
        next(error);
    }
};

exports.cancelBooking = (req, res, next) => {
    try {
        bookingService.cancelBooking(req.params.id);
        res.json({ success: true, message: 'Reservación cancelada con éxito' });
    } catch (error) {
        res.status(400);
        next(error);
    }
};
