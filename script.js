// Cambiar el fondo del navbar al hacer scroll
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.remove("transparent");
        navbar.classList.add("solid");
    } else {
        navbar.classList.remove("solid");
        navbar.classList.add("transparent");
    }
});


// Función para copiar el correo
document.getElementById("copy-email").addEventListener("click", function () {
    const email = document.getElementById("email").textContent;
    navigator.clipboard.writeText(email).then(() => {
        alert("Correo copiado al portapapeles");
    }).catch(err => {
        alert("Hubo un error al copiar el correo: " + err);
    });
});


// Inicializar el mapa con las coordenadas convertidas
const map = L.map('map').setView([-34.627083, -58.448528], 15); // Coordenadas en formato decimal

// Añadir capa de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Añadir marcador en la ubicación correcta
const marker = L.marker([-34.627083, -58.448528]).addTo(map);

// Personalizar popup del marcador
marker.bindPopup("<b>Ubicación</b><br>Calle Miró entre Valle y Pedro Goyena<br>Caballito, CABA").openPopup();


// Desplazamiento suave ajustado para encabezado fijo
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado
        const targetId = this.getAttribute('href').substring(1); // Obtiene el id de la sección
        const targetElement = document.getElementById(targetId);
        const headerHeight = document.querySelector('nav').offsetHeight; // Altura del encabezado fijo

        // Calcular la posición del desplazamiento
        const targetPosition = targetElement.offsetTop - headerHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Duración en milisegundos (1 segundo)
        let startTime = null;

        // Función de animación personalizada
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Función de easing para suavizar el desplazamiento
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        // Iniciar la animación
        requestAnimationFrame(animation);
    });
});


// Función de desplazamiento suave con ajuste adicional
function smoothScrollTo(targetId, duration = 1000, offset = 100) {
    const targetElement = document.querySelector(targetId);
    const startPosition = window.scrollY;
    const targetPosition = targetElement.offsetTop - offset; // Ajusta la posición restando más píxeles
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Evento de clic en el botón "Conóceme"
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = ctaButton.getAttribute('href');
    smoothScrollTo(targetId, 1200, 150); // Ajusta el valor del offset (150 píxeles hacia arriba)
});


// Script para el menú hamburguesa
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Alterna el menú desplegable
hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('mobile'); // Activa/desactiva el menú
    navMenu.classList.toggle('hidden'); // Controla la visibilidad
});
