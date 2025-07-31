export function horizontalMobile() {
   

    
  const container = document.querySelector("#experience");
  
  let tl;
  const projectList = container.querySelector(".projectList");
  const destello =document.querySelector(".flash");
  const scrollLength = projectList.scrollWidth - window.innerWidth;
  console.log(scrollLength);
  

 tl = gsap.timeline({
    scrollTrigger: {
     
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      once:false
       
    }
  });

  // Paso 1: Iluminación
  tl.to(container, {
    filter: "brightness(1)",
    duration: 0.4
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


ScrollTrigger.normalizeScroll(true);
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
      
    },
    onEnter: () => destello.style.opacity = 1,
    
    onEnterBack: () => destello.style.opacity = 1,
    onLeaveBack: () => destello.style.opacity = 0,
     onStart: () => {
        scrollTrigger.refresh();      }, 
  });
  
}
