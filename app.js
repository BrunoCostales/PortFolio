import { initializeMobileScroll } from './mobileScroll.js';
initializeMobileScroll();

// Detecta si estás en móvil

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// 🫧 BURBUJAS (no se tocan)
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach((bubble, i) => {
  let goingOut = true;

  const animate = () => {
    const maxMove = 400;
    const x = (Math.random() - 0.5) * maxMove;
    const y = (Math.random() - 0.5) * maxMove;

    bubble.style.transition = 'transform 3s ease-in-out';
    bubble.style.transform = goingOut ? `translate(${x}px, ${y}px)` : 'translate(0, 0)';
    goingOut = !goingOut;
    setTimeout(animate, 2000);
  };

  setTimeout(animate, i * 1000);
});

// -----------------------------------
// 🍔 MENÚ HAMBURGUESA
const burguerMenu = document.querySelector('.menuIcon');
const mobileMenu = document.querySelector('.mobileMenu');
const navLinks = document.querySelectorAll('.mobileMenu a');

burguerMenu.addEventListener('click', () => {
  burguerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('active'));
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    burguerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    // Solo previene el comportamiento si es un enlace interno
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
