import { coordScrollMobile } from "./coordScrollMobile.js";

export function initMobile() {
  /* ScrollTrigger.getAll().forEach((t) => t.kill(true));
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); */

  // -----------------------------------
  // 🍔 MENÚ HAMBURGUESA
  const burguerMenu = document.querySelector(".menuIcon");
  const mobileMenu = document.querySelector(".mobileMenu");
  const navLinks = document.querySelectorAll(".navLinks a");

  burguerMenu.addEventListener("click", () => {
    burguerMenu.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden"; // Desactiva el scroll
    } else {
      document.body.style.overflow = ""; // Reactiva el scroll
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      burguerMenu.classList.remove("active");
      mobileMenu.classList.remove("active");

      // Solo previene el comportamiento si es un enlace interno
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
  callLenis();
  coordScrollMobile();
}
let lenisInstance;
function callLenis() {
  if (window.innerWidth > 768 || typeof Lenis === "undefined" || lenisInstance)
    return lenisInstance;

  // ✅ Crear instancia Lenis
  const lenis = new Lenis({
    smooth: true, // No queremos smooth tradicional
    smoothTouch: true, // ✅ Scroll fluido en móviles
    touchMultiplier: 1.1, // Sensibilidad del dedo
    duration: 1.1, // Fluidez general,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  requestAnimationFrame(raf);
  ScrollTrigger.defaults({
    scroller: lenis.scrollElement, // Esto le dice a ScrollTrigger que escuche a Lenis
  });
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded",
  });
  // ✅ Vincular scroll con ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  let lastScroll = 0;
  function raf(time) {
    lenis.raf(time); // <- controla el scroll suave
    const current = lenis.scroll || 0;
    if (Math.abs(current - lastScroll) > 0.5) {
      /* ScrollTrigger.update(); */
      lastScroll = current;
    }
    requestAnimationFrame(raf);
  }

  lenisInstance = lenis;
  return lenis;
}
