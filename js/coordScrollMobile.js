import { horizontalMobile } from "./horizontalMobile.js";
import { scrollEngineMobile } from "./scrollEngineMobile.js";
export function coordScrollMobile (){
ScrollTrigger.getAll().forEach(t => t.kill(true));
 
 
 ScrollTrigger.refresh(true);

  scrollEngineMobile();
 horizontalMobile();

}