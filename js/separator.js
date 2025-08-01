import { expAnimationInit } from "./experience.js";
export function shooter(){

ScrollTrigger.create({
  id:"shooterTrigger",
  invalidateOnRefresh: true,
  trigger: "#separator",
  start: "bottom bottom", // cuando la parte inferior del separador toca el fondo de la pantalla
  once: false, // para que se ejecute solo una vez
  onEnter: () => {
    ScrollTrigger.refresh(true);
    expAnimationInit(); // llama tu animación
  }

});

}