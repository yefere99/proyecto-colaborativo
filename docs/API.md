# Hotel Reservation REST API

## Endpoints

### Habitaciones (Rooms)

**GET** `/api/v1/rooms`
- Descripción: Recupera todas las habitaciones.
- Respuesta:
  ```json
  {
    "success": true,
    "data": [ ... ]
  }
  ```

**GET** `/api/v1/rooms/:id`
- Descripción: Recupera detalle de una habitación.

### Reservaciones (Bookings)

**POST** `/api/v1/bookings`
- Descripción: Crea nueva reservación.
- Body:
  ```json
  {
    "room_id": 1,
    "guest_name": "Juan Perez",
    "guest_email": "juan@example.com",
    "check_in": "2026-05-10",
    "check_out": "2026-05-15",
    "guests": 2
  }
  ```

**GET** `/api/v1/bookings`
- Descripción: Lista todas las reservas.

**GET** `/api/v1/bookings/:id`
- Descripción: Detalle de reserva.

**DELETE** `/api/v1/bookings/:id`
- Descripción: Cancela una reserva.
