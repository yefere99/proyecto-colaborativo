-- ============================================
-- Hotel Reservation App — Database Schema
-- ============================================

-- Tabla de habitaciones
CREATE TABLE IF NOT EXISTS rooms (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    type        TEXT    NOT NULL CHECK(type IN ('standard', 'deluxe', 'suite', 'penthouse')),
    description TEXT    NOT NULL,
    price_per_night REAL NOT NULL CHECK(price_per_night > 0),
    capacity    INTEGER NOT NULL CHECK(capacity > 0),
    amenities   TEXT    NOT NULL DEFAULT '[]',  -- JSON array
    image_url   TEXT    NOT NULL DEFAULT '',
    status      TEXT    NOT NULL DEFAULT 'available' CHECK(status IN ('available', 'maintenance')),
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Tabla de reservaciones
CREATE TABLE IF NOT EXISTS bookings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id     INTEGER NOT NULL,
    guest_name  TEXT    NOT NULL,
    guest_email TEXT    NOT NULL,
    check_in    TEXT    NOT NULL,
    check_out   TEXT    NOT NULL,
    guests      INTEGER NOT NULL CHECK(guests > 0),
    total_price REAL    NOT NULL CHECK(total_price >= 0),
    status      TEXT    NOT NULL DEFAULT 'confirmed' CHECK(status IN ('confirmed', 'cancelled', 'completed')),
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON bookings(guest_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_type ON rooms(type);
