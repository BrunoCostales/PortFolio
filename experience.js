export function expAnimationInit(){
const experience= document.getElementById("experience");

gsap.fromTo(experience,{
  opacity: 0,
  filter: "blur(20px)",
  y: 100
}, {
  opacity: 1,
  filter: "blur(0px)",
  y: 0,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#separator",
    start: "top top",
    end: "bottom center",
    scrub: true,
   
  }
});


}