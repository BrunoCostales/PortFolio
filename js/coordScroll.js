
import {initScrollEngine} from './scrollEngine.js';
import { initHomeAboutScroll } from './home.js';
import { initAboutAnimations } from './about.js';

import { shooter } from './separator.js';
import { initEmailForm } from './email.js';


gsap.registerPlugin(ScrollTrigger);
const lenis = initScrollEngine();

export function initApp() {

 ScrollTrigger.getAll().forEach(t => t.kill(true));
  ScrollTrigger.refresh(true);


  initHomeAboutScroll(lenis);
  initAboutAnimations();
  shooter();
 initEmailForm();



}
