import { horizontalMobile } from "./horizontalMobile.js";
import { scrollEngineMobile } from "./scrollEngineMobile.js";
export function coordScrollMobile() {
  const container = document.querySelector("#experience");
  const projectList = container.querySelector("#experience .containerMain");
  const scrollLength = projectList.scrollWidth - window.innerWidth;

  scrollEngineMobile();
  horizontalMobile(scrollLength, container, projectList);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
