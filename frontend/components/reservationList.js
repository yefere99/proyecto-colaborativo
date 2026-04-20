export function renderReservationList(reservations) {
    if (!reservations || reservations.length === 0) {
        return `
            <section class="reservations-section container" style="text-align: center; padding: 120px 0;">
                <h2 class="section-title">Mis Reservas</h2>
                <p style="color: var(--text-secondary);">Aún no tiene reservas.</p>
                <a href="#/rooms" class="btn btn-primary" style="margin-top: 2rem;">Ver Suites</a>
            </section>
        `;
    }

    const rows = reservations.map(res => `
        <tr>
            <td>#${res.id}</td>
            <td style="font-weight: 500;">${res.room_name}</td>
            <td>${res.check_in}</td>
            <td>${res.check_out}</td>
            <td style="color: var(--gold-light);">$${res.total_price}</td>
            <td>
                <span class="amenity-badge" style="background: ${res.status === 'confirmed' ? 'var(--success)' : (res.status === 'cancelled' ? 'var(--danger)' : 'transparent')}; color: white; border: none;">
                    ${res.status === 'confirmed' ? 'Confirmada' : (res.status === 'cancelled' ? 'Cancelada' : res.status)}
                </span>
            </td>
            <td>
                ${res.status === 'confirmed' ? `<button class="btn btn-outline cancel-btn" data-id="${res.id}" style="padding: 6px 12px; font-size: 0.75rem;">Cancelar</button>` : ''}
            </td>
        </tr>
    `).join('');

    return `
        <section class="reservations-section container">
            <h2 class="section-title">Mis Reservas</h2>
            <div class="reservation-table-wrap glass-panel" style="padding: 1px;">
                <table class="reservation-table">
                    <thead style="background: rgba(0,0,0,0.4);">
                        <tr>
                            <th>ID</th>
                            <th>Suite</th>
                            <th>Llegada</th>
                            <th>Salida</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}
