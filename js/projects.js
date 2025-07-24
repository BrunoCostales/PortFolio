export function initProjectsHorizontalScroll() {
  const panels = gsap.utils.toArray(".work");
  const totalScrollLength = (panels.length - 1) * window.innerWidth;

  gsap.to(".projectList", {
    x: () => `-${totalScrollLength}`,
    ease: "none",
    scrollTrigger: {
      trigger: "#projects",
      start: "top top",
      end: () => `+=${totalScrollLength}`,
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });
}