import { horizontalMobile } from "./horizontalMobile.js";
import { scrollEngineMobile } from "./scrollEngineMobile.js";
export function coordScrollMobile (){
ScrollTrigger.getAll().forEach(t => t.kill(true));
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

 

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
  });
  

// ScrollTrigger.normalizeScroll({
//   type: "touch",
//   momentum: true,
//  preventDefault: false,
//   suppressWheel: false,
//    debounce: 5,
//   lockAxis: true,
  
//   allowNestedScroll: false
// });
requestAnimationFrame(() => ScrollTrigger.refresh());
  const container = document.querySelector("#experience");
 const projectList = container.querySelector(".projectList");
 const scrollLength = projectList.scrollWidth - window.innerWidth;
 ScrollTrigger.refresh(true);

  scrollEngineMobile();
 horizontalMobile(scrollLength,container,projectList);

}