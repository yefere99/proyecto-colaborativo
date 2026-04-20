import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHero } from './components/heroSection.js';
import { renderRoomCard } from './components/roomCard.js';
import { renderBookingForm } from './components/bookingForm.js';
import { renderReservationList } from './components/reservationList.js';
import { showToast } from './components/toast.js';

// API Context
const API_BASE = '/api/v1';

// Router & State App
const app = {
    async init() {
        document.getElementById('main-header').innerHTML = renderHeader();
        document.getElementById('main-footer').innerHTML = renderFooter();

        window.addEventListener('hashchange', this.router.bind(this));
        
        // Efecto scroll en el header
        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(5, 5, 5, 0.95)';
                header.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.8)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            }
        });

        this.router(); // Cargar la vista inicial
    },

    async router() {
        const hash = window.location.hash.slice(1) || '/';
        const main = document.getElementById('app');
        
        // Actualizar active state de la navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${hash.split('?')[0]}`) {
                link.classList.add('active');
            }
        });

        if (hash === '/') {
            main.innerHTML = renderHero();
        } else if (hash.startsWith('/rooms')) {
            await this.renderRoomsView(main);
        } else if (hash.startsWith('/booking')) {
            const roomId = new URLSearchParams(hash.split('?')[1]).get('room');
            this.renderBookingView(main, roomId);
        } else if (hash.startsWith('/reservations')) {
            await this.renderReservationsView(main);
        } else {
            main.innerHTML = '<div class="container" style="padding: 100px 0; text-align: center;"><h2>404 - Página no encontrada</h2></div>';
        }
    },

    async renderRoomsView(container) {
        container.innerHTML = '<div class="container" style="padding: 100px 0; text-align:center;"><p>Cargando suites...</p></div>';
        try {
            const res = await fetch(`${API_BASE}/rooms`);
            const data = await res.json();
            
            if(data.success) {
                const roomsHtml = data.data.map(room => renderRoomCard(room)).join('');
                container.innerHTML = `
                    <section class="rooms-section container">
                        <h2 class="section-title">Nuestras Suites Exclusivas</h2>
                        <div class="rooms-grid">
                            ${roomsHtml}
                        </div>
                    </section>
                `;
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            container.innerHTML = `<div class="container" style="padding: 100px 0; text-align:center; color: var(--danger);"><p>Error al cargar las suites.</p></div>`;
            window.showToast('Error al cargar las suites', 'error');
        }
    },

    renderBookingView(container, roomId) {
        container.innerHTML = renderBookingForm(roomId);
        
        // Setup logic para el form
        const form = document.getElementById('booking-form');
        const checkIn = document.getElementById('check_in');
        const checkOut = document.getElementById('check_out');
        
        checkIn.addEventListener('change', (e) => {
            checkOut.min = e.target.value;
            if (checkOut.value && checkOut.value <= e.target.value) {
                checkOut.value = '';
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.guests = parseInt(data.guests);
            
            try {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Procesando...';
                btn.disabled = true;

                const res = await fetch(`${API_BASE}/bookings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await res.json();
                
                if (result.success) {
                    window.showToast('¡Reserva completada! Total: $' + result.data.total_price.toFixed(2), 'success');
                    window.location.hash = '/reservations';
                } else {
                    window.showToast(result.error || 'Error al procesar la reserva', 'error');
                }
                
                btn.innerText = originalText;
                btn.disabled = false;
            } catch (err) {
                window.showToast('Error de red', 'error');
            }
        });
    },

    async renderReservationsView(container) {
        container.innerHTML = '<div class="container" style="padding: 100px 0; text-align:center;"><p>Cargando reservas...</p></div>';
        try {
            const res = await fetch(`${API_BASE}/bookings`);
            const data = await res.json();
            
            if(data.success) {
                container.innerHTML = renderReservationList(data.data);
                
                // Add cancel event listeners
                container.querySelectorAll('.cancel-btn').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const id = e.target.dataset.id;
                        if(confirm('¿Está seguro de que desea cancelar esta reservación?')) {
                            try {
                                const cancelRes = await fetch(`${API_BASE}/bookings/${id}`, { method: 'DELETE' });
                                const cancelData = await cancelRes.json();
                                if(cancelData.success) {
                                    window.showToast('Reservación cancelada con éxito', 'success');
                                    this.renderReservationsView(container); // reload
                                } else {
                                    window.showToast(cancelData.error, 'error');
                                }
                            } catch(err) {
                                window.showToast('Error al cancelar la reservación', 'error');
                            }
                        }
                    });
                });
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            container.innerHTML = `<div class="container" style="padding: 100px 0; text-align:center; color: var(--danger);"><p>Error al cargar las reservas.</p></div>`;
            window.showToast('Error al cargar las reservas', 'error');
        }
    }
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
