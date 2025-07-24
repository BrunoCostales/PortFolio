import { initApp } from './coordScroll.js';

// Inicializar scroll


initApp();


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

document.addEventListener('DOMContentLoaded', () => {
  // Botones manuales
  const btnEn = document.getElementById('btn-en');
  const btnEs = document.getElementById('btn-es');

  if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
  if (btnEs) btnEs.addEventListener('click', () => changeLanguage('es'));

  // Detección automática solo si estamos en index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    const userLang = navigator.language || navigator.userLanguage;
    const hasRedirected = sessionStorage.getItem('langRedirected');

    if (!hasRedirected) {
      if (userLang.startsWith('es')) {
        sessionStorage.setItem('langRedirected', 'true');
        window.location.href = 'index-es.html';
      }
    }
  }
});

function changeLanguage(lang) {
  if (lang === 'es') {
    window.location.href = 'index-es.html';
  } else {
    window.location.href = 'index.html';
  }
}

