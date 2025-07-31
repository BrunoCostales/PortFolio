
import {initScrollEngine} from './scrollEngine.js';
import { initHomeAboutScroll } from './home.js';
import { initAboutAnimations } from './about.js';
import { shooter } from './separator.js';
import { moveBubbles } from './bubles.js';






export function initApp() {



    moveBubbles();
    
    
      const lenis = initScrollEngine();
      gsap.registerPlugin(ScrollTrigger);
      scrollToEngine(lenis);
      
ScrollTrigger.getAll().forEach(t => t.kill(true));
  ScrollTrigger.refresh(true);
        initHomeAboutScroll(lenis);
   initAboutAnimations();
   shooter();




 


    
    


}




function scrollToEngine(lenis) {
 
  const bottom=lenis.limit;
  
  const goToContact = document.getElementById("btnScrollToContact");
  const vh=window.innerHeight;
  goToContact.addEventListener("click", (e) => {
    console.log ("Hizo click");
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill(true); // destruye animación y limpia
    });

  ScrollTrigger.refresh(true); // recalcula alturas internas de GSAP

    setTimeout(() => {
      requestAnimationFrame(() => {
        lenis.scrollTo("#contact", {
          offset: 0,      // podés ajustar si necesitás compensar navbars fijas
          duration: 1.2,  // duración del scroll
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // easing suave
        });
      });
    }, 50); // un pequeño delay permite a ScrollTrigger expandir el layout
  });
    
document.querySelector('#btnScrollToProjects')?.addEventListener('click', (e) => {
  e.preventDefault();
gsap.registerPlugin(ScrollToPlugin);

  setTimeout(() => {
    const container = document.querySelector("#experience");
    const projectList = container?.querySelector(".projectList");

    if (!container || !projectList) return;

    // 1. Calculamos el scroll vertical necesario para activar 60% del pin
    const scrollLength = projectList.scrollWidth - window.innerWidth;
    const startY = container.getBoundingClientRect().top + window.scrollY;
    const progress = 0.44; // ⚠️ Podés ajustar este valor
    const targetY = startY + scrollLength * progress;

    // 2. Usamos GSAP para scrollear hacia esa posición
    gsap.to(window, {
      duration: 1.5,
      scrollTo: targetY,
      ease: "power2.inOut"
    });

  }, 150); // tiempo mínimo para que shooter registre triggers
 
  
  
 


 

 
});
      
 
  
}