import { expAnimationInit } from "./experience.js";

export function initAboutAnimations(value) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top top', // cuando el fondo del trigger llega al fondo de la ventana
      end: '+=200%',
      pin:value, // fija el elemento durante la animación
       // evita el espacio extra al fijar el elemento
      scrub: true, // hace que la animación siga el scroll
       // fija el elemento durante la animación
      markers: false,
      toggleActions: 'play reverse play reverse', // acciones al entrar y salir del trigger
      
     onLeave: () => {
        const aboutTrigger = ScrollTrigger.getById("about");
        if (aboutTrigger) {
          aboutTrigger.kill(true);
        }

        ScrollTrigger.refresh(true);
        
      }
     
    },
    
  });

  // 1. Intercambio de imágenes
  tl.to('.Discover img', {
    opacity: 1,
    duration: 1
  }, 0);

  tl.to('.sillhoulleteBoxAbout img', {
    opacity: 0,
    duration: 1
  }, 0);

  // 2. Ocultar títulos
  tl.to(['.titleAbout', '.titleMe'], {
    opacity: 0,
    y: -20,
    duration: 1,
    display: 'none'
  }, 0);

  // 3. Mostrar párrafo
  tl.set('.hideblock', {
    display: 'block'
  });

  tl.fromTo('.hideblock', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 1
  });

  tl.fromTo('#about', {
  backgroundColor: 'rgba(166, 60, 109, 0)' // #a63c6d00
}, {
  backgroundColor: 'rgba(166, 60, 109, 1)', // #a63c6d
  duration: 1.5,
  ease: 'power1.out'
},0 );
}
