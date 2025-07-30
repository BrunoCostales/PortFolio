export function scrollEngineMobile() {
    gsap.registerPlugin(ScrollTrigger);
 ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
  });
  

const lenis = new Lenis({
  duration: 1.35,
  
  
  touchMultiplier: .6,
  gestureOrientation: 'vertical',
  easing: (t) => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2,
    syncTouch:true,
    syncTouchLerp:true,
    touchInertiaExponent: 0.5,
    autoResize:true,
    infinite:false


});







    // Refrescamos todo en caso de bugs de layout al rotar el dispositivo
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
    requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  const aboutTl = gsap.timeline({
  scrollTrigger: {
    id: "aboutTrigger",
    fastScrollEnd: true,
    invalidateOnRefresh: true, // Evita que se reinicie la animación al refrescar
    anticipatePin: true, // Evita el espacio extra al fijar el elemento
    // Evita que la animación se reinicie al hacer scroll rápido
    trigger: '#about',
    start: 'top top',
    end: '+=120%',
    pin: true,
    scrub: 0.6,
    markers: false,
    toggleActions: 'play reverse play reverse',
    onStart: () => {
      ScrollTrigger.refresh();
    },
  }
});
aboutTl.to('.Discover img', {
  opacity: 1,
  duration: 1
}, 0);

aboutTl.to('.sillhoulleteBoxAbout img', {
  opacity: 0,
  duration: 1
}, 0);

aboutTl.to(['.titleAbout', '.titleMe'], {
  opacity: 0,
  y: -20,
  duration: 1,
  display: 'none'
}, 0);

aboutTl.set('.hideblock', {
  display: 'block'
});

aboutTl.fromTo('.hideblock', {
  opacity: 0,
  y: 20
}, {
  opacity: 1,
  y: 0,
  duration: 1
});

aboutTl.fromTo('#about', {
  backgroundColor: 'rgba(166, 60, 109, 0)' // transparente
}, {
  backgroundColor: 'rgba(166, 60, 109, 1)', // visible
  duration: 1.5,
  ease: 'power1.out'
}, 0);
const container = document.querySelector("#experience");
const projectList = container.querySelector(".projectList");
const destello = document.querySelector(".flash");
const scrollLength = projectList.scrollWidth - window.innerWidth;
    
 // Establecer filtro inicial para evitar pantalla blanca
    container.style.filter = "brightness(0.3)";
    destello.style.opacity = 0;

    const experienceTl = gsap.timeline({
      scrollTrigger: {
        id: "experienceTimeline",
        trigger: container,
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: 1.6,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
      }
    });

    experienceTl.fromTo(container,
      { filter: "brightness(0)" },
      { filter: "brightness(1)", duration: 0.5, ease: "none", immediateRender: true }
    );

    experienceTl.to(container, {
      x: -scrollLength,
      ease: "none"
    });

    experienceTl.to(destello, {
      x: "10vw",
      y: "5vh",
      ease: "none"
    }, "<");

    ScrollTrigger.create({
      id: "experienceTrigger",
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.8,
      fastScrollEnd: true,
      invalidateOnRefresh: true,

      onUpdate: self => {
        const progress = self.progress;
        const x = -100 + progress * 400;
        const y = 80 + Math.sin(progress * Math.PI) * 5;

        destello.style.left = `${x}vw`;
        destello.style.top = `${y}vh`;
        destello.style.filter = "saturate(150%)";
      },

      onEnter: () => destello.style.opacity = 1,
      onEnterBack: () => destello.style.opacity = 1,
      onLeaveBack: () => destello.style.opacity = 0,
      onStart: () => ScrollTrigger.refresh()
    });



  
}
























   
  















