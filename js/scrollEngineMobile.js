export function scrollEngineMobile() {
  ScrollTrigger.getById("aboutTriggerMobile")?.kill();

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      id: "aboutTriggerMobile",
      trigger: "#about",
      start: "top 20%",
      end: "center top", // distancia de scroll en la que puede activarse
      scrub: false,
      once: true, // opcional: se dispara una sola vez
      invalidateOnRefresh: true,
      ignoreMobileResize: true,
    },
  });

  aboutTl.to(
    ".navLinksAbout li a",
    { fontWeight: 900, color: "rgba(255, 255, 255, 0.4)" },
    0
  );
  aboutTl.to(
    [".titleAbout", ".titleMe"],
    {
      opacity: 0,
      y: -20,
      duration: 1,
      display: "none",
    },
    0
  );
  aboutTl.set(".hideblock", { display: "block" });
  aboutTl.fromTo(
    ".hideblock",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1 }
  );
  aboutTl.to(".Discover img", { opacity: 1, duration: 1 }, 0);
  aboutTl.to(".sillhoulleteBoxAbout img", { opacity: 0, duration: 0.6 }, 0);
}
