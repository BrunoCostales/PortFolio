export function expAnimationInit() {
  const container = document.querySelector("#experience");
  const projectList = container.querySelector(".projectList");
  const scrollLength = projectList.scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  // Paso 1: Iluminación
  tl.to(container, {
    filter: "brightness(1)",
    duration: 0.1
  });

  // Paso 2: Movimiento horizontal
  tl.to(container, {
    x: -scrollLength,
    ease: "none"
  });
}