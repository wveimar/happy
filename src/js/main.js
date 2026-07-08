// Happy Time Entertainment — interacciones de UI
document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar: transparente -> sólida al hacer scroll ---
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Menú móvil (hamburguesa) ---
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        menu.classList.toggle('is-open', !open);
    });

    // Cerrar al hacer clic en un enlace
    menu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar al redimensionar a escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 900) closeMenu();
    });
});
