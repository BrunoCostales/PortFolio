

export function initScrollEngine() {
  const lenis = new Lenis({
    smooth: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // suavidad
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: true,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Para que ScrollTrigger sepa que hay movimiento
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Exporta lenis si querés usar scrollTo desde otros módulos
  return lenis;
}