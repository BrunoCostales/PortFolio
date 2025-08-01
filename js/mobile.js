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
callLenis();
 coordScrollMobile();



}
function callLenis() {
  // ✅ Solo ejecutar en móviles
  if (window.innerWidth > 768 || typeof Lenis === 'undefined') return;

  // ✅ Crear instancia Lenis
  const lenis = new Lenis({
    smooth: false,             // No queremos smooth tradicional
    smoothTouch: true,         // ✅ Scroll fluido en móviles
    touchMultiplier: 1.3,      // Sensibilidad del dedo
    duration: 1.6              // Fluidez general
  });

  // ✅ Vincular scroll con ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // ✅ Loop de animación
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update(); // Sincroniza GSAP
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  console.log("Lenis initialized for mobile scrolling", lenis);


  // ✅ Devuelve la instancia si la querés usar en otro módulo
  return lenis;
}