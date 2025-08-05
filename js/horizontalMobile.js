export function horizontalMobile(scrollLength, container, projectList) {
  let tl;
  let lenghtnew = scrollLength * 2;

  ScrollTrigger.getById("horizontalScrollMobile")?.kill();

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${lenghtnew}`,
      scrub: 0.3,
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
      x: -1 * scrollLength,
      ease: "none",
    },
    0.2
  );
}
