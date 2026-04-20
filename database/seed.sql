-- ============================================
-- Hotel Reservation App — Seed Data
-- ============================================

INSERT OR IGNORE INTO rooms (id, name, type, description, price_per_night, capacity, amenities, image_url, status) VALUES
(1, 'Habitación Estándar Vista Jardín', 'standard',
 'Habitación acogedora con vista al jardín interior. Perfecta para viajeros que buscan comodidad y tranquilidad. Incluye cama queen, escritorio de trabajo y baño privado con ducha de lluvia.',
 89.99, 2,
 '["WiFi Gratis", "TV 42 pulgadas", "Aire Acondicionado", "Minibar", "Caja Fuerte"]',
 '', 'available'),

(2, 'Habitación Estándar Superior', 'standard',
 'Espaciosa habitación con decoración moderna y todas las comodidades esenciales. Ideal para estancias de negocios o placer con cama king y zona de estar.',
 109.99, 2,
 '["WiFi Gratis", "TV 50 pulgadas", "Aire Acondicionado", "Minibar", "Escritorio Ejecutivo", "Cafetera"]',
 '', 'available'),

(3, 'Habitación Deluxe Oceánica', 'deluxe',
 'Elegante habitación con impresionantes vistas al océano. Disfrute de un balcón privado, bañera de hidromasaje y servicio premium. Decoración sofisticada con acabados en mármol.',
 199.99, 3,
 '["WiFi Gratis", "TV 55 pulgadas", "Balcón Privado", "Bañera Hidromasaje", "Minibar Premium", "Servicio a Habitación 24h", "Albornoz y Pantuflas"]',
 '', 'available'),

(4, 'Suite Junior Ejecutiva', 'suite',
 'Suite refinada con sala de estar separada, perfecta para ejecutivos. Incluye acceso al lounge ejecutivo, desayuno buffet y late checkout garantizado. Decoración contemporánea de lujo.',
 349.99, 2,
 '["WiFi Gratis", "TV 65 pulgadas", "Sala de Estar", "Lounge Ejecutivo", "Desayuno Incluido", "Late Checkout", "Minibar Premium", "Nespresso"]',
 '', 'available'),

(5, 'Suite Presidencial', 'suite',
 'La joya de nuestro hotel. Suite de 120m² con sala de estar, comedor privado, jacuzzi con vista panorámica y mayordomo personal. Experiencia de lujo sin igual.',
 599.99, 4,
 '["WiFi Gratis", "Smart TV 75 pulgadas", "Sala + Comedor", "Jacuzzi Panorámico", "Mayordomo Personal", "Minibar Full", "Cocina Privada", "Estacionamiento VIP"]',
 '', 'available'),

(6, 'Penthouse Royal', 'penthouse',
 'El penthouse más exclusivo con terraza de 200m², piscina privada infinity, chef personal y helipuerto. Dos plantas con vistas 360° de la ciudad. La máxima expresión del lujo.',
 1299.99, 6,
 '["WiFi Gratis", "Smart TV 85 pulgadas", "Piscina Infinity Privada", "Terraza 200m²", "Chef Personal", "Mayordomo 24h", "Spa Privado", "Helipuerto", "Limusina"]',
 '', 'available');
