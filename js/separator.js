import { expAnimationInit } from "./experience.js";
export function shooter(){

ScrollTrigger.create({
  trigger: "#separator",
  start: "bottom bottom", // cuando la parte inferior del separador toca el fondo de la pantalla
  once: true, // para que se ejecute solo una vez
  onEnter: () => {
    expAnimationInit(); // llama tu animación
  }
});

}