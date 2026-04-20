const { getDatabase } = require('../../database/connection');

exports.getAllRooms = () => {
    const db = getDatabase();
    const rooms = db.prepare('SELECT * FROM rooms').all();
    rooms.forEach(room => room.amenities = JSON.parse(room.amenities));
    return rooms;
};

exports.getRoomById = (id) => {
    const db = getDatabase();
    const room = db.prepare('SELECT * FROM rooms WHERE id = ?').get(id);
    if (room) {
        room.amenities = JSON.parse(room.amenities);
    }
    return room;
};
