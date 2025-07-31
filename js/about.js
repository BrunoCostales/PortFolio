

export function initAboutAnimations(value) {
  const trigger =ScrollTrigger.getById('aboutTrigger');
  if (trigger) {
  trigger.kill(true); // elimina el trigger si ya existe
   // actualiza el scrollTrigger
  
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      id:"aboutTrigger",
      trigger: '#about',
      start: 'top top', // cuando el fondo del trigger llega al fondo de la ventana
      end: '+=200%',
      pin:value, // fija el elemento durante la animación
       // evita el espacio extra al fijar el elemento
      scrub: true, // hace que la animación siga el scroll
       // fija el elemento durante la animación
      markers: false,
      toggleActions: 'play reverse play reverse', // acciones al entrar y salir del trigger,
      onStart: () => {
        scrollTrigger.refresh();      }, 
    
        
    
     
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
