export function horizontalMobile(scrollLength, container, projectList) {
  let tl;
  ScrollTrigger.getById("horizontalScrollMobile")?.kill();

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
      once: false,
      ignoreMobileResize: true,
      invalidateOnRefresh: true,
      id: "horizontalScrollMobile",
    },
  });

  // Paso 1: Iluminación

  tl.to(
    container,
    {
      opacity: 1,
      ease: "power2.out",
      duration: 0.19, // ocupa el 20% inicial del timeline
    },
    0
  );

  // Paso 2: Movimiento horizontal
  tl.to(
    container,
    {
      x: -scrollLength,
      ease: "none",
    },
    0.2
  );
}
