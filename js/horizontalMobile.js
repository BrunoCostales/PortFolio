export function horizontalMobile(scrollLength,container,projectList) {
   

    

  
  let tl;
 
  const destello =document.querySelector(".flash");
 
  console.log(scrollLength);

  

 tl = gsap.timeline({
    scrollTrigger: {
     
      trigger: container,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.3,
      pin: true,
      anticipatePin: 0.5,
      once:false,
      ignoreMobileResize: true,
      invalidateOnRefresh: true,
    
      
     
       
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


  
}
