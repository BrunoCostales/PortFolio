import { coordScrollMobile } from "./coordScrollMobile.js";

export function initMobile() {
    


// -----------------------------------
// 🍔 MENÚ HAMBURGUESA
const burguerMenu = document.querySelector('.menuIcon');
const mobileMenu = document.querySelector('.mobileMenu');
const navLinks = document.querySelectorAll('.navLinks a');


burguerMenu.addEventListener('click', () => {
  burguerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden'; // Desactiva el scroll
  } else {
    document.body.style.overflow = ''; // Reactiva el scroll
  }
  
});

  

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    burguerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    
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

 coordScrollMobile();



}