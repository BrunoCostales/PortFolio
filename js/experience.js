export let tl;
export function expAnimationInit() {
    
  const container = document.querySelector("#experience");
  

  const projectList = container.querySelector(".projectList");
  const destello =document.querySelector(".flash");
  const scrollLength = projectList.scrollWidth - window.innerWidth;

 tl = gsap.timeline({
    scrollTrigger: {
      id: "experienceTimeline",
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
       
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
   tl.to(destello, {
    x: "10vw", // o "100px", según lo que quieras mover
    y: "5vh", // leve movimiento hacia arriba
    ease: "none"
  }, "<");



    ScrollTrigger.create({
      id:"experienceTrigger",
    trigger: container,
    start: "top top",
    end: `+=${scrollLength}`,
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;

      // Movimiento relativo
      const x = 10 + progress * 300; // 70vw a 85vw
      const y = 90 + Math.sin(progress * Math.PI) * 5; // leve efecto en Y

      destello.style.left = `${x}vw`;
      destello.style.top = `${y}vh`;
      destello.style.saturate="150%"
    },
    onEnter: () => destello.style.opacity = 1,
    
    onEnterBack: () => destello.style.opacity = 1,
    onLeaveBack: () => destello.style.opacity = 0,
     onStart: () => {
        scrollTrigger.refresh();      }, 
  });
  
}