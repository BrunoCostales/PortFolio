
export function initMobile() {
    


// -----------------------------------
// 🍔 MENÚ HAMBURGUESA
const burguerMenu = document.querySelector('.menuIcon');
const mobileMenu = document.querySelector('.mobileMenu');
const navLinks = document.querySelectorAll('.mobileMenu a');

burguerMenu.addEventListener('click', () => {
  burguerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  
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







}