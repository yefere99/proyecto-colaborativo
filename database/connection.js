/**
 * Database Connection Module
 * Inicializa SQLite y ejecuta schema + seed si la BD es nueva.
 */
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'hotel.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');

let db;

/**
 * Obtiene la instancia de la base de datos (singleton).
 * Inicializa schema y seed si la BD es nueva.
 */
function getDatabase() {
    if (db) return db;

    const isNew = !fs.existsSync(DB_PATH);

    db = new Database(DB_PATH);

    // Habilitar WAL mode para mejor rendimiento concurrente
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Ejecutar schema siempre (usa IF NOT EXISTS)
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    db.exec(schema);

    // Seed solo si la BD es nueva
    if (isNew) {
        const seed = fs.readFileSync(SEED_PATH, 'utf-8');
        db.exec(seed);
        console.log('✅ Base de datos inicializada con datos de ejemplo');
    }

    console.log('📦 Conexión a SQLite establecida:', DB_PATH);
    return db;
}

/**
 * Cierra la conexión a la base de datos.
 */
function closeDatabase() {
    if (db) {
        db.close();
        db = undefined;
        console.log('🔒 Conexión a SQLite cerrada');
    }
}

module.exports = { getDatabase, closeDatabase };
