import { initAboutAnimations } from './about.js';
import { initApp } from './coordScroll.js';
gsap.registerPlugin(ScrollTrigger);

let inAbout = false; // ✅ mover afuera

function typeText(element) {
  const text = element.textContent;
  element.textContent = '';
  const chars = text.split('');

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.innerHTML = char === ' ' ? '&nbsp;' : char;
    span.style.opacity = '0';
    element.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      duration: 0.04,
      delay: i * 0.1,
      ease: 'power1.inOut'
    });
  });
}

function setupAboutObserver() {
  const about = document.querySelector('#about');
  if (!about) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      inAbout = entry.intersectionRatio >= 0.8;
    },
    {
      threshold: [0, 0.8, 1],
    }
  );

  observer.observe(about);
}


export function initHomeAboutScroll(lenis) {
  const heading = document.getElementById('mainHeading');
  if (heading) typeText(heading);

  const home = document.querySelector('#home');
  const about = document.querySelector('#about');

  if (!home || !about) return;

  setupAboutObserver(); // ✅ solo una vez

  let isAnimating = false;
  let touchStartY = 0;
  let delta;
  

  const handleScroll = (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }

     if (e.type === 'wheel') {
    delta = e.deltaY;
  } else if (e.type === 'touchend') {
    const touchEndY = e.changedTouches[0].clientY;
    delta = touchStartY - touchEndY;
  } else {
    return;
  }


  

    const scrollY = window.scrollY;
    const homeTop = home.offsetTop;
    const aboutTop = about.offsetTop;

    const inHome = scrollY >= homeTop && scrollY < aboutTop;

    if (!(inHome || inAbout)) return;

    if (inHome && delta > 0) {
      isAnimating = true;
      e.preventDefault();
      lenis.scrollTo(about, {
        duration:1.4,
        easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
        lock: true,
        onComplete: () => {
          isAnimating = false;
           const trigger = ScrollTrigger.getById('about');
          if (trigger) trigger.kill(true);

          gsap.set(['#mainHeading'], { clearProps: "all" });

          initAboutAnimations(true); // ✅ iniciar animaciones de About
          ScrollTrigger.refresh(true);
        },
      });
    }

    if (inAbout && delta < 0) {
      isAnimating = true;
      e.preventDefault();
      lenis.scrollTo(home, {
        duration: 1.2,
        easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
        lock: true,
        onComplete: () => {
          isAnimating = false;
          initApp();
          initAboutAnimations(false); // ✅ reiniciar animaciones de About
          
           

        }
  
      });
    }
  };















  

  window.addEventListener('wheel', handleScroll, { passive: false });

window.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].clientY;
  
}, { passive: false });
window.addEventListener('touchend', handleScroll, { passive: false });
window.addEventListener('touchmove', (e) => {
  if (isAnimating) {
    e.preventDefault();
  }
}, { passive: false });


}
