import { initializeMobileScroll } from './mobileScroll.js';
import {initScrollEngine} from './scrollEngine.js';
import { initHomeAboutScroll } from './home.js';
import { initAboutAnimations } from './about.js';
import { expAnimationInit } from './experience.js';
import { shooter } from './separator.js';

gsap.registerPlugin(ScrollTrigger);
const lenis = initScrollEngine();
initializeMobileScroll();
export function initApp() {

 ScrollTrigger.getAll().forEach(t => t.kill(true));
  ScrollTrigger.refresh(true);


  initHomeAboutScroll(lenis);
  initAboutAnimations();
  shooter();



}
