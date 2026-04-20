export function renderHeader() {
    return `
        <div class="container nav-container">
            <a href="#/" class="logo">GOLDEN HORIZON</a>
            <ul class="nav-menu">
                <li><a href="#/" class="nav-link" data-route="/">Inicio</a></li>
                <li><a href="#/rooms" class="nav-link" data-route="/rooms">Suites</a></li>
                <li><a href="#/reservations" class="nav-link" data-route="/reservations">Mis Reservas</a></li>
            </ul>
        </div>
    `;
}
