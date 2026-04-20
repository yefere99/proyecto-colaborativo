export function renderBookingForm(roomId) {
    return `
        <section class="booking-section">
            <div class="glass-panel booking-form-container">
                <h2 class="section-title" style="margin-bottom: 2rem;">Complete su Reservación</h2>
                <form id="booking-form">
                    <input type="hidden" id="room_id" name="room_id" value="${roomId || 1}">
                    
                    <div class="form-group">
                        <label class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" name="guest_name" required placeholder="Juan Pérez">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" name="guest_email" required placeholder="juan@ejemplo.com">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label class="form-label">Fecha de LLegada</label>
                            <input type="date" class="form-control" name="check_in" required id="check_in" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 150px;">
                            <label class="form-label">Fecha de Salida</label>
                            <input type="date" class="form-control" name="check_out" required id="check_out">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Huéspedes</label>
                        <input type="number" class="form-control" name="guests" required min="1" max="6" value="1">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem; font-size: 1rem; padding: 16px;">Confirmar Reservación</button>
                </form>
            </div>
        </section>
    `;
}
