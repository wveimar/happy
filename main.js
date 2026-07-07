/* =========================================================
   HAPPY TIME ENTERTAINMENT — MAIN.JS
   Vanilla JS · Mobile-First · Performant
   ========================================================= */

(function () {
  'use strict';

  // ---------- 1. MENÚ HAMBURGUESA ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = mainNav.querySelectorAll('.main-nav__link');

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ---------- 2. HEADER SCROLLED ----------
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- 3. SCROLL REVEAL (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => {
            el.classList.add('is-visible');
          }, parseInt(delay, 10));
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- 4. PARALLAX SUTIL EN ORBES ----------
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;

  function updateParallax() {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.08;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ---------- 5. FORMULARIO DE CONTACTO ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const message = data.get('message');
      const phone = data.get('phone') || '';

      // Envía a WhatsApp como fallback inmediato
      const text = `Hola Happy Time! Soy ${name}. ${message} ${phone ? 'Mi tel: ' + phone : ''}`;
      const url = `https://wa.me/51992034877?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');

      form.reset();
    });
  }

  // ---------- 6. SMOOTH SCROLL PARA LINKS INTERNOS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = header.offsetHeight + 20;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ---------- 7. REDUCED MOTION ----------
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--duration', '0.01s');
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

})();