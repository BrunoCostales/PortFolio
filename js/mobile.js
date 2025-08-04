import { coordScrollMobile } from "./coordScrollMobile.js";
export function initMobile() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  callLenis();
  coordScrollMobile();
  scrollToSectionMobile();
}

let lenisInstance;
function callLenis() {
  if (window.innerWidth > 768 || typeof Lenis === "undefined" || lenisInstance)
    return lenisInstance;

  const lenis = new Lenis({
    smooth: true, // No queremos smooth tradicional
    smoothTouch: true, // ✅ Scroll fluido en móviles
    touchMultiplier: 0.9, // Sensibilidad del dedo
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
  lenis.on("scroll", ScrollTrigger.update);
  let lastScroll = 0;
  function raf(time) {
    lenis.raf(time);
    const current = lenis.scroll || 0;
    if (Math.abs(current - lastScroll) > 0.5) {
      lastScroll = current;
    }
    requestAnimationFrame(raf);
  }

  lenisInstance = lenis;
  return lenis;
}

function scrollToSectionMobile() {
  const contact = document.getElementById("btnScrollToContact");
  const project = document.querySelector("#btnScrollToProjects");
  const vh = window.innerHeight;

  contact.addEventListener("click", () => goTo("#contact"));
  project.addEventListener("click", () => goTo("#job"));
}

function goTo(target) {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: target, // ID del elemento al que querés ir
    ease: "power2.inOut",
  });
}
