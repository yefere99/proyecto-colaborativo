const { getDatabase } = require('../../database/connection');

exports.createBooking = (data) => {
    const db = getDatabase();
    
    // Calcular noches
    const checkIn = new Date(data.check_in);
    const checkOut = new Date(data.check_out);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        throw new Error('Check-out debe ser después del check-in.');
    }
    if (!data.guest_name || !data.guest_email || !data.guests) {
        throw new Error('Faltan datos en la reservación.');
    }
    
    const room = db.prepare('SELECT price_per_night, capacity FROM rooms WHERE id = ?').get(data.room_id);
    if (!room) {
        throw new Error('Habitación no encontrada.');
    }
    if (data.guests > room.capacity) {
        throw new Error('Capacidad máxima excedida para esta habitación.');
    }
    
    const total_price = room.price_per_night * nights;

    const stmt = db.prepare(`
        INSERT INTO bookings (room_id, guest_name, guest_email, check_in, check_out, guests, total_price)
        VALUES (@room_id, @guest_name, @guest_email, @check_in, @check_out, @guests, @total_price)
    `);

    const result = stmt.run({ ...data, total_price });
    return { id: result.lastInsertRowid, total_price };
};

exports.getAllBookings = () => {
    const db = getDatabase();
    return db.prepare(`
        SELECT b.*, r.name as room_name 
        FROM bookings b 
        JOIN rooms r ON b.room_id = r.id
        ORDER BY b.created_at DESC
    `).all();
};

exports.getBookingById = (id) => {
    const db = getDatabase();
    return db.prepare(`
        SELECT b.*, r.name as room_name 
        FROM bookings b 
        JOIN rooms r ON b.room_id = r.id 
        WHERE b.id = ?
    `).get(id);
};

exports.cancelBooking = (id) => {
    const db = getDatabase();
    const info = db.prepare('UPDATE bookings SET status = "cancelled" WHERE id = ? AND status != "cancelled"').run(id);
    if (info.changes === 0) {
        throw new Error('Reservación no encontrada o ya está cancelada.');
    }
    return true;
};
