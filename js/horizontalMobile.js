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
      scrub: 1.8,
      pin: true,
      anticipatePin: 1,
      once:false,
      ignoreMobileResize: true,
      inavlidateOnRefresh: true,
      onLeave: () => {
    // Pequeño delay antes del scroll automático
    gsap.delayedCall(0.5, () => {
      gsap.to(window, {
        scrollTo: {
          y: "#contact", // ⚠️ ajustá al ID de tu siguiente sección
          offsetY: 0     // si tenés header fijo, podés poner un valor aquí
        },
        duration: 1.6,
        ease: "power2.inOut"
      });
    });
  }
      
     
       
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
  
  
}
