const express = require('express');
const cors = require('cors');
const path = require('path');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');
const { getDatabase } = require('../database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa BD (si es inicialización run desde cli, sino obtiene la conex.)
getDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Sirve archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Manejo de errores centralizado
app.use(errorHandler);

// Inicia servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
