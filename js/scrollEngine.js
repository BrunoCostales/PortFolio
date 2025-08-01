

export function initScrollEngine() {
  const lenis = new Lenis({
    smooth: false,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // suavidad
    direction: 'vertical',
    gestureDirection: 'vertical',
    touchMultiplier:1,
    wheelMultiplier:1.4,
    syncTouch:true,
    smoothTouch: true,
     infinite: false,
    autoResize: true,

  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Para que ScrollTrigger sepa que hay movimiento
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });
  ScrollTrigger.scrollerProxy(document.body, {
  ScrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : lenis.scroll.instance.scroll.y
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  },
  pinType: document.body.style.transform ? "transform" : "fixed"
});

ScrollTrigger.refresh();

  // Exporta lenis si querés usar scrollTo desde otros módulos
  
  
  return lenis;
}
