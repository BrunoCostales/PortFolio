import { horizontalMobile } from "./horizontalMobile.js";

export function expAnimationMobileInit() {
    
ScrollTrigger.create({
  
  trigger: "#separator",
  start: "bottom bottom", // cuando la parte inferior del separador toca el fondo de la pantalla
  once: false, // para que se ejecute solo una vez
    onEnter: () => {
        ScrollTrigger.refresh(true);
        console.log("Separator entro");
        
        
        horizontalMobile();
    }

});
}