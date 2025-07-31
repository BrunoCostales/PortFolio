import { scrollEngineMobile } from "./scrollEngineMobile.js";
import { expAnimationMobileInit} from "./separatorMobile.js"
export function coordScrollMobile (){
ScrollTrigger.getAll().forEach(t => t.kill(true));
  ScrollTrigger.refresh(true);
  ScrollTrigger.normalizeScroll(true);


  scrollEngineMobile();
  expAnimationMobileInit();

}