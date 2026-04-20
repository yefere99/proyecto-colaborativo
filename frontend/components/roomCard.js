export function renderRoomCard(room) {
    const amenitiesHtml = room.amenities.slice(0, 3).map(a => `<span class="amenity-badge">${a}</span>`).join('');
    const extraAmenities = room.amenities.length > 3 ? `<span class="amenity-badge">+${room.amenities.length - 3}</span>` : '';
    
    // Asignar imágenes si no tiene (simulación)
    const mockImages = {
        'suite': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        'deluxe': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
        'penthouse': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        'standard': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    };
    const imgUrl = room.image_url || mockImages[room.type] || mockImages['standard'];

    return `
        <article class="room-card glass-panel">
            <img src="${imgUrl}" alt="${room.name}" class="room-image">
            <div class="room-details">
                <h3 class="room-title">${room.name}</h3>
                <div class="room-price">$${room.price_per_night} <span style="font-size: 0.8rem; color: var(--text-secondary);">/ noche</span></div>
                <div class="room-amenities">
                    ${amenitiesHtml}
                    ${extraAmenities}
                </div>
                <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.4;">${room.description.substring(0, 80)}...</p>
                <a href="#/booking?room=${room.id}" class="btn btn-outline" style="width: 100%;">Reservar Ahora</a>
            </div>
        </article>
    `;
}
