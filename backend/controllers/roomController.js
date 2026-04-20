const roomService = require('../services/roomService');

exports.getAllRooms = (req, res, next) => {
    try {
        const rooms = roomService.getAllRooms();
        res.json({ success: true, data: rooms });
    } catch (error) {
        next(error);
    }
};

exports.getRoomById = (req, res, next) => {
    try {
        const room = roomService.getRoomById(req.params.id);
        if (!room) {
            return res.status(404).json({ success: false, error: 'Habitación no encontrada' });
        }
        res.json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
};
